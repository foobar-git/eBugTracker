import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserImage } from 'src/app/_models/userImage';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  //currentUser: User;                      // populated by AccountService  // v20
  user: any;
  user$: Observable<any>;
  isAdmin: boolean = false;

  // v20
  // constructor(private accountService: AccountService, private userService: UsersService, private toastr: ToastrService) {
  //   this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentUser = user);
  // }

  constructor(private userService: UsersService, private authorization: AuthorizationService, private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    //this.loadUser();                      // v20
    this.authorization.userAuthorization$.subscribe(userType => this.isAdmin = userType);
    this.authorization.userData$.subscribe(user => this.user = user);
  }

  // loadUser() {                           // v20
  //   this.userService.getAppUser(this.appUser.username).subscribe(user => this.user = user); // v15
  //   this.user$ = this.userService.getAppUser(this.appUser.username);
  //   this.user$.subscribe(user => this.user = user);
  // }

  updateUser() {
    console.log(this.user);

    this.userService.updateAppUser(this.user).subscribe(() => {
      this.toastr.success("Profile edited, changes saved.")
      this.editForm.reset(this.user);       // reset form status, keeping changes for user
    });
  }

}
