import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/internal/operators/take';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  currentLoggedInUser: User;
  user$: Observable<any>;
  user: any;
  username: string;
  userId: number;
  userType: string;   // implemented as string only for development -could be impleneted be as numbers in produciton (admin = 0, etc.)
  private userType$ = new BehaviorSubject<any>({ });
  userAuthorization$ = this.userType$.asObservable();
  private userModel$ = new BehaviorSubject<any>({ });
  userData$ = this.userModel$.asObservable();

  constructor(private http: HttpClient, private accountService: AccountService, private userService: UsersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => {
        this.currentLoggedInUser = user;
        //console.log(this.currentLoggedInUser);
        this.getUserDataAsync();
      },
      error => console.log(error)
    );
    //console.log("authorization service running...");
  }

  getUserDataAsync(id?: number) {
    if (this.currentLoggedInUser != null) {
      if (id != null) this.user$ = this.userService.getAppUserById(id);
      else this.user$ = this.userService.getAppUser(this.currentLoggedInUser.username);
      this.user$.subscribe(
        user => {
          this.user = user
          this.username = this.user.username;
          //console.log(this.username);
          this.userId = this.user.id;
          this.userType = this.user.userType;
          this.setUserCredentials();
          this.userModel$.next(this.user);
        },
        error => console.log(error)
      );
    }
  }

  userIsAdmin() {
    return this.userType === "Admin" ? true : false;
  }

  setUserCredentials() {
    this.userType$.next(this.userIsAdmin());
  }

  userAuthorized_levelAdmin(author: string) {
    //console.log(this.user);
    //console.log(author);
    if (this.userType === "Admin") return true;
    else return false;
  }

  userAuthorized_levelSuperUser(author: string) {
    //console.log(this.user);
    //console.log(author);
    if (this.username === author || this.userType === "SuperUser" || this.userType === "Admin" ) return true;
    else return false;
  }

  userAuthorized_levelNormalUser(author: string) {
    //console.log(this.user);
    //console.log(author);
    if (this.username === author || this.userType === "Admin") return true;
    else return false;
  }
  
}
