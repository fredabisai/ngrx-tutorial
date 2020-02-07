import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError} from 'rxjs/operators';
import {CustomerService} from '../customer.service';
import * as customerActions from '../state/customer.actions';
import { Customer} from '../customer.model';
@Injectable()
export class CustomerEffects {
    constructor(
        private actions$: Actions,
        private customerService: CustomerService
    ) { }

    @Effect()
    loadCustomers: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ),
        mergeMap((
            actions: customerActions.LoadCustomers) => this.customerService
                  .getCustomers().pipe(
                      map(
                          (customers: Customer[]
                            ) => new customerActions.LoadCustomersSuccess(customers)
                      ),
                      catchError(err => of(new customerActions.LoadCustomersFail(err)))

                  ))
    );
    @Effect()
    loadCustomer: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ),
        mergeMap((
            action: customerActions.LoadCustomer) => this.customerService
                  .getCustomerById(action.payload).pipe(
                      map(
                          (customer: Customer
                            ) => new customerActions.LoadCustomerSuccess(customer)
                      ),
                      catchError(err => of(new customerActions.LoadCustomerFail(err)))

                  ))
    );
    @Effect()
    createCustomer: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ),
        mergeMap((
            action: customerActions.CreateCustomer) => this.customerService
                  .createCustomer(action.payload).pipe(
                      map(
                          (customer: Customer
                            ) => new customerActions.CreateCustomerSuccess(customer)
                      ),
                      catchError(err => of(new customerActions.CreateCustomerFail(err)))

                  ))
    );
}