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
  model: any = {} // initialize to an empty object
  //loggedIn : boolean = false;       v1
  //currentUser$: Observable<User>;   v2 (using async pipe)
  isAdmin: boolean = false;

  //constructor(private accountService: AccountService) { }                       v1 + v2
  //constructor(public accountService: AccountService, private router: Router) { }  // v5
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    //this.getCurrentUser(); // get user from account service     v1
    //this.currentUser$ = this.account-Service.currentUser$;      v1 + v2
    this.authorizationService.userAuthorization$.subscribe(
      userType => this.isAdmin = userType
    )
  }

  login() {
    //console.log(this.model);
    this.accountService.login_service(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/stats')
        //this.loggedIn = true;                                   v1

        //console.log(this.isAdmin);
        window.location.href="stats";                             // reload page fetching user data (authorization service)
      },
      error => {
        console.log(error),
        this.toastr.error(error.error);
      });
  }

  logout() {
    this.accountService.logout_service();
    //this.loggedIn = false;                                      v1
    //this.router.navigateByUrl('/');                             v19
    window.location.href="/";
  }

  /*getCurrentUser() {                                            v1
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
