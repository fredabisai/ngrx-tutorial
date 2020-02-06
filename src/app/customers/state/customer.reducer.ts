import * as customerActions from './customer.actions';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Customer} from '../customer.model';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector} from '@ngrx/store';

export interface CustomerState {
    ids: [],
    entities: {},
    selectedCustomerId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface AppState extends fromRoot.AppState {
    customers: CustomerState
}
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
    ids: [],
    entities: {},
    selectedCustomerId:  null,
    loading: false,
    loaded: false,
    error: ''
}

export const initialState = customerAdapter.getInitialState(defaultCustomer);
export function customerReducer(state = initialState, action) {
    switch (action.type) {
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
            return {
                ...state,
                loading: true
            }
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            return customerAdapter.addAll( action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: true,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
const getCustomerFeatureState = createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(getCustomerFeatureState, 
      customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(getCustomerFeatureState,
                             (state: CustomerState) => state.loading);

export const getCustomersLoaded = createSelector(getCustomerFeatureState,
                                (state: CustomerState) => state.loaded);

export const getError = createSelector(getCustomerFeatureState,
    (state: CustomerState) => state.error);
