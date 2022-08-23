import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {} // initialize to an empty object
  loggedIn : boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser(); // get user from account service
  }

  login() {
    //console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    }, error => console.log(error));
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      // set the loggedIn status for the current user
      this.loggedIn = !!user; // double exclamation marks turn an object into a boolean
                              // if the user is null then loggedIn = false; if the user
                              // is something then loggedIn = true
    }, error => {
      console.log(error);
    })
  }

}
