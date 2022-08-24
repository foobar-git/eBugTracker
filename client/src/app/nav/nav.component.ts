import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {} // initialize to an empty object
  //loggedIn : boolean = false;       v1
  //currentUser$: Observable<User>;   v2 (using async pipe)

  //constructor(private accountService: AccountService) { }     v1 + v2
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser(); // get user from account service   v1
    //this.currentUser$ = this.accountService.currentUser$;     v1 + v2
  }

  login() {
    //console.log(this.model);
    this.accountService.login_service(this.model).subscribe(response => {
      console.log(response);
      //this.loggedIn = true;           v1
    }, error => console.log(error));
  }

  logout() {
    this.accountService.logout_service();
    //this.loggedIn = false;            v1
  }

  /*getCurrentUser() {                  v1
    this.accountService.currentUser$.subscribe(user => {
      // set the loggedIn status for the current user
      this.loggedIn = !!user; // double exclamation marks turn an object into a boolean
                              // if the user is null then loggedIn = false; if the user
                              // is something then loggedIn = true
    }, error => {
      console.log(error);
    })
  }*/

  bar(username) {
    //if (model.username != null) model.username.charAt(0).toUpperCase() + model.username.slice(1).toLowerCase()
    if (username != null)
      return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    else
      return 'POP';
  }

  //the optional chaining operator '?' is used here to check if the variable is not null
  getUserName_forNavBar = u_name => u_name?.charAt(0).toUpperCase() + u_name?.slice(1).toLowerCase()

}
