import { Component, OnInit } from '@angular/core';
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
  appUser: any;
  user: User;         // populated by AccountService

  constructor(private accountService: AccountService, private userService: UsersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadAppUser();
  }

  loadAppUser() {
    this.userService.getAppUser(this.user.username).subscribe(appUser => this.appUser = appUser)
  }

}
