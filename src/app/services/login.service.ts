import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { baseUrl } from 'src/environments/environment';
import { UserAccount } from '../models/UserAccount';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${baseUrl}`;
  email!: string;
  password!: string;


  constructor(private http: HttpClient) { }

  login(user: UserAccount): Observable<any> {
    return this.http.get(this.url + `/authenticate/${user.email}/${user.password}`)
  }
}
