import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomers() {
    return this.http.get('http://localhost:3000/customers');
  }
  getCustomerById(id) {
    return this.http.get(`http://localhost:3000/customers/${id}`);
  }
  createCustomer(data) {
    return this.http.post('http://localhost:3000/customers', data);
  }
  updateCustomer(data) {
    return this.http.patch(`http://localhost:3000/customers/${data.id}`, data);
  }
  deleteCustomer(id) {
    return this.http.delete(`http://localhost:3000/customers/${id}`);
  }

 }
