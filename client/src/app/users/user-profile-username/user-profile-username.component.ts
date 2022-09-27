import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/_models/appUser';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-profile-username',
  templateUrl: './user-profile-username.component.html',
  styleUrls: ['./user-profile-username.component.css']
})
/*
export class UserProfileUsernameComponent implements OnInit {                         v14
  user: any;
  username: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.username = params.get('username');
      console.log(this.username);
    });
    this.getUser(this.username);
  }

  getUser(username: string) {
    this.http.get('https://localhost:5001/api/users/' + username).subscribe({ // observables do nothing until subscribed
      next: response => this.user = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }
}*/

export class UserProfileUsernameComponent implements OnInit {
  appUser: AppUser[];

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getAppUser(this.route.snapshot.paramMap.get('username')).subscribe(user => {
      this.appUser = user;
    })
  }
}
