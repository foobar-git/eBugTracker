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
  users$: Observable<AppUser[]>;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.userService.getAppUsers();
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

}
