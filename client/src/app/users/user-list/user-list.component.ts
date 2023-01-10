import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/app/_models/appUser';
import { UsersService } from 'src/app/_services/users.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchText: string = "";
  //users: any;                                 // v13
  //appUsers: AppUser[];                        // v15
  users$: Observable<AppUser[]>;

  //constructor(private http: HttpClient) { }   // v13
  constructor(private userService: UsersService) { }

  // ngOnInit(): void {                         // v13
  //   this.getUsers();
  // }

  ngOnInit(): void {
    this.loadUsers();
  }

  // getUsers() {                               // v13
  // observables do nothing until subscribed
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => this.users = response,
  //     error: error => console.log(error)//,
  //     //complete: () => void
  //   })
  // }

  loadUsers() {
    // v15
    // this.userService.getAppUsers().subscribe(users => {
    //   this.appUsers = users;
    // })
    this.users$ = this.userService.getAppUsers();
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

}
