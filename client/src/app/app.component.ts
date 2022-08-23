import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eBug Tracker';
  users: any; // effectively turning off type safety for 'users'

  constructor(private http: HttpClient, private accountService: AccountService) { } // making an http request in this constructor is considered too early

  ngOnInit() { // this is initialized after the constructor
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')); // get uset data from local storage and
    this.accountService.setCurrentUser(user);                    // and set it for current user via account service
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({ // observables do nothing until subscribed
      next: response => this.users = response,
      error: error => console.log(error)/*,
      complete: () => void*/
    })
  }
}
