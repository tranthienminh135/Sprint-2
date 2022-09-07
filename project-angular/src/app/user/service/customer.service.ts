import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomerByUsername(username: string): Observable<Customer> {
    return this.httpClient.get<Customer>(API_URL + '/get/customer/' + username);
  }
}
