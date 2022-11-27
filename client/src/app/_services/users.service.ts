import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_models/appUser';

/*  v14
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
    return this.http.get<AppUser[]>(this.baseUrl + 'users/' + username, httpOptions);
  }

  getAppUsers() {
    return this.http.get<AppUser[]>(this.baseUrl + 'users', httpOptions);
  }
}*/

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: AppUser[] = [];

  constructor(private http: HttpClient) { }

  getAppUser(username: string) {
    //return this.http.get<AppUser[]>(this.baseUrl + 'users/' + username);  // v15
    const user = this.users.find(u => u.username === username);
    if (user !== undefined) return of(user);
    return this.http.get<AppUser[]>(this.baseUrl + 'users/' + username);
  }

  getAppUsers() {
    //return this.http.get<AppUser[]>(this.baseUrl + 'users');    // v15
    if (this.users.length > 0) return of(this.users);
    return this.http.get<AppUser[]>(this.baseUrl + 'users').pipe(
      map(users => {
        this.users = users;
        return users;
      })
    )
  }

  updateAppUser(user: AppUser) {
    //return this.http.put(this.baseUrl + 'users/', user);   // v15
    return this.http.put(this.baseUrl + 'users/', user).pipe(
      map( () => {
        const index = this.users.indexOf(user);
        this.users[index] = user;
      })
    )
  }
}
