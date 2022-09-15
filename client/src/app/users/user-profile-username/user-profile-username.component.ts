import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-username',
  templateUrl: './user-profile-username.component.html',
  styleUrls: ['./user-profile-username.component.css']
})

export class UserProfileUsernameComponent implements OnInit {
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
}
