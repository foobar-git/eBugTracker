import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthorizationService } from './_services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eBug Tracker';
  users: any;
  constructor(private router: Router, private accountService: AccountService,
    private authorizationService: AuthorizationService) {   // making an http request in this constructor is considered too early
      this.onRouterChangeGetUserData();
    }

  ngOnInit() { // initialized after the constructor
    this.setCurrentUser();
    this.refreshOnBackButtonClick();
  }

  refreshOnBackButtonClick(): void {
    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.authorizationService.getUserDataAsync();
      }
    });
  }

  onRouterChangeGetUserData() {
    this.router.events.subscribe( (ev) => {
      if (ev instanceof NavigationStart) {
        this.authorizationService.getUserDataAsync();
      }
    });
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')); // get user data from local storage and
    this.accountService.setCurrentUser_service(user);            // and set it for current user via account service
  }

}
