import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;             //v3
  @Output() cancelRegisterUser = new EventEmitter();
  model: any = {};

  //constructor() { }         v3
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  registerNewUser() {
    console.log(this.model);
    this.accountService.registerNewUser_service(this.model).subscribe(response => {
      console.log(response);
      this.cancelUserRegistration();  // EDIT
    }, error => {
      console.log(error);
    })
  }

  cancelUserRegistration() {
    console.log('User registration cancelled.');
    this.cancelRegisterUser.emit(false);
  }

}
