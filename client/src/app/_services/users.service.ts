import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_models/appUser';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: AppUser[] = [];
  userIdToEdit: number;

  constructor(private http: HttpClient) { }

  getAppUserById(id: number) {
    const user = this.users.find(u => u.id === id);
    if (user !== undefined) return of(user);
    return this.http.get<AppUser[]>(this.baseUrl + 'users/id/' + id);
  }

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
    //console.log(user);
    return this.http.put(this.baseUrl + 'users/id/' + user.id, user);
  }

}
