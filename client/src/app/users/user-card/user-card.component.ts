import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/_models/appUser';
import { AuthorizationService } from 'src/app/_services/authorization.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() appUser: AppUser;
  isAdmin: boolean = false;

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizeUser(this.appUser.username);
  }

  authorizeUser(user: string) {
    this.isAdmin = this.authorization.userAuthorized(user);
  }

}
