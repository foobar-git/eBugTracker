import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { UsersService } from 'src/app/_services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Input() user: AppUser;
  isAdmin: boolean = false;

  constructor(private authorization: AuthorizationService, private userService: UsersService) { }

  ngOnInit(): void {
    this.authorizeUser(this.user.username);
  }

  authorizeUser(user: string) {
    this.isAdmin = this.authorization.userAuthorized_levelAdmin(user);
  }

  editUser() {
    //console.log(this.user.id);
    this.authorization.getUserDataAsync(this.user.id);
  }

}
