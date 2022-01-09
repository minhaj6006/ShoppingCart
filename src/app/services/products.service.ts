import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { baseUrl } from 'src/environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = `${baseUrl}`;

  constructor(private http: HttpClient) { }

  public getAllProduct(): Observable<Product> {
    return this.http.get<Product>(this.url + `/products`);
  }

  public getAllProductByCategory(categoryName: string): Observable<Product> {
    return this.http.get<Product>(this.url + `/products/${categoryName}`)
  }
}
