import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { UserAccount } from '../models/UserAccount';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = `${baseUrl}`;
  
  constructor(private http: HttpClient) { }

  register(user: UserAccount): Observable<Object>{
    
    return this.http.post(this.url + `/registration/`, user)
  }
}
