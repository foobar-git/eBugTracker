import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  userType: string;           // implemented as string only for development -should be as numbers in produciton (admin = 0, etc.)

  constructor(private accountService: AccountService, private http: HttpClient) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentLoggedInUser = user);
    //console.log("authorization service running...");
    this.getUserDataAsync(this.currentLoggedInUser.username);
  }

  getUserDataAsync(username: string) {
    this.http.get('https://localhost:5001/api/users/' + username).subscribe({ // observables do nothing until subscribed
      next: response => this.user = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.user.id);
        this.userId = this.user.id;
        this.userType = this.user.userType;
      }
    });
  }

}
