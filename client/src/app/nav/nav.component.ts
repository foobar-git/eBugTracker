import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AuthorizationService } from '../_services/authorization.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}                         // initialize to an empty object
  isAdmin: boolean = false;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.userAuthorization$.subscribe(
      userType => this.isAdmin = userType
    )
  }

  login() {
    //console.log(this.model);
    this.accountService.login_service(this.model).subscribe(
      () => {
        //console.log(this.isAdmin);
        window.location.href="projects";  // reload page fetching user data (authorization service)
      },
      error => {
        console.log(error),
        this.toastr.error(error.error);
      });
  }

  logout() {
    this.accountService.logout_service();
    window.location.href="/";
  }

  /*getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      // set the loggedIn status for the current user
      this.loggedIn = !!user; // double exclamation marks turn an object into a boolean
                              // if the user is null then loggedIn = false; if the user
                              // is something then loggedIn = true
    }, error => {
      console.log(error)//,
      //complete: () => void
    })
  }*/

  //the optional chaining operator '?' is used here to check if the variable is not null
  //getUserName_forNavBar = u_name => u_name?.charAt(0).toUpperCase() + u_name?.slice(1).toLowerCase()

}
