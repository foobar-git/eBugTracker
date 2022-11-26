import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/internal/operators/take';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  currentLoggedInUser: User;
  user: any;
  userId: number;
  userType: string;                   // implemented as string only for development -should be as numbers in produciton (admin = 0, etc.)
  private userType$ = new BehaviorSubject<any>({ });
  userAuthorization$ = this.userType$.asObservable();

  constructor(private accountService: AccountService, private http: HttpClient) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      user => {
        this.currentLoggedInUser = user;
        console.log(this.currentLoggedInUser);
          //this.getUserDataAsync(this.currentLoggedInUser.username);
          this.getUserDataAsync();
      },
      error => console.log(error)
    );
    console.log("authorization service running...");
  }

  getUserDataAsync() {
    if (this.currentLoggedInUser != null) {
      this.http.get('https://localhost:5001/api/users/' + this.currentLoggedInUser.username).subscribe({ // observables do nothing until subscribed
        next: response => this.user = response,
        error: error => console.log(error),
        complete: () => {
          this.userId = this.user.id;
          this.userType = this.user.userType;
          //console.log(this.userId);
          //console.log(this.userType);
          this.setUserType(this.userIsAdmin());
        }
      });
    }
  }

  userAuthorized(author: string) {
    //console.log(this.user);
    //console.log(author);
    if (this.currentLoggedInUser.username === author || this.userType === "Admin") return true;
    else return false;
  }

  userIsAdmin() {
    //console.log(this.userType);
    return this.userType === "Admin" ? true : false;
  }

  setUserType(admin: boolean) {
    this.userType$.next(admin);
  }

}
