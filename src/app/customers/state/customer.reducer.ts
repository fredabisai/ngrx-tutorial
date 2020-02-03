import * as customerActions from './customer.actions';
import {Customer} from '../customer.model';
import * as fromRoot from '../../state/app-state';

export interface CustomerState {
    customers: Customer[],
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface AppState extends fromRoot.AppState {
    customers: CustomerState
}

export const initialState: CustomerState = {
    customers: [],
    loading: true,
    loaded: false,
    error: ''
}
export function customerReducer(state = initialState, action) {
    switch (action.type) {
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
            return {
                ...state,
                loading: true
            }
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                customers: action.payload
            }
        }
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
            return {
                ...state,
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