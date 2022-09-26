import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_modules/appUser';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token    // will give error if user is not logged in
                                                                                  // without the optional chaining operator '?'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAppUser(username: string) {
    return this.http.get<AppUser[]>(this.baseUrl + 'user/' + username, httpOptions);
  }

  getAppUsers() {
    return this.http.get<AppUser[]>(this.baseUrl + 'users', httpOptions);
  }
}
