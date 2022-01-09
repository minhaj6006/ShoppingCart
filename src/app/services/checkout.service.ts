import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { CheckoutDetails } from '../models/CheckoutDetails';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url: string = `${baseUrl}`;

  constructor(private http: HttpClient) { }

  checkout(cD: CheckoutDetails): Observable<Object> {
    return this.http.post(this.url + `/checkout`, cD)
  }
}
