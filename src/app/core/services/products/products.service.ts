import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { HandleHttpResponseError } from 'src/app/utils/error';

import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

interface User {
  email: string;
  gender: string;
  phone: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }

  getRandomUsers(): Observable<User[]> {
    return this.http.get('https://sdfsfsrandomuser.me/api/?results=2').pipe(
      retry(3),
      catchError(HandleHttpResponseError),
      map((response: any) => response.results as User[])
    );
  }

  getFile() {
    return this.http.get('assets/files/test.txt', { responseType: 'text' });
  }
}
