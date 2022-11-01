import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/internal/operators/take';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  appUser: User;      // populated by AccountService
  user$: Observable<any>;
  user: any;

  constructor(private accountService: AccountService, private userService: UsersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    //this.userService.getAppUser(this.appUser.username).subscribe(user => this.user = user); // v15
    this.user$ = this.userService.getAppUser(this.appUser.username);
    this.user$.subscribe(user => this.user = user);
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateAppUser(this.user).subscribe(() => {
      this.toastr.success("Profile edited, changes saved.")
      this.editForm.reset(this.user);         // reset form status, keeping changes for user
    })
  }

}
