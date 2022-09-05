import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getNewProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + "/new/products");
  }

  createNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + "/product/create", product);
  }
}
