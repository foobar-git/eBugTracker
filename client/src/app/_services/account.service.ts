import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
                              // special type of observable
  private currentUserSource = new ReplaySubject<User>(1); // size of buffer (how many users to store)
  // observables by convention with $ at the end
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login_service(model: any) {
    //return this.http.post(this.baseUrl + 'account/login', model)        // v3
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  registerNewUser_service(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  // helper function
  setCurrentUser_service(user: User) {
    this.currentUserSource.next(user);
  }

  logout_service() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
