import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../../environments/environment';

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

  getAllPageProducts(pageNumber: number, categoryId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + "/product/page?page=" + pageNumber + "&categoryId=" + categoryId);
  }

  findProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/product/detail/' + id);
  }

  updateProduct(value: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + "/product/edit", value)
  }

  getAllListProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/product/list');
  }
}
