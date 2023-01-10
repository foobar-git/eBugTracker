import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any                                    // v3

  //constructor() { }                           // v2
  //constructor(private http: HttpClient) { }   // v3
  constructor() { }

  ngOnInit(): void {
    //this.getUsers();      // v2 (used for ´Whats your fav usah?´)
  }

  // helper function
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    //this.http.get('https://localhost:5001/api/users').subscribe(users => this.users = users);   // v3
  }

  cancelRegisterUserMode(event: boolean) {
    this.registerMode = event;
  }

  goToUrl(url: string) {
    window.location.href = url;
  }

}
