import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegisterUser = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  registerNewUser() {
    console.log(this.model);
    this.accountService.registerNewUser_service(this.model).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      },
      complete: () => {
        if (window.confirm("Register new user?")) {
          window.alert("New user created");
          window.location.href = "projects";
        }
      }
    });
  }

  cancelUserRegistration() {
    console.log('User registration cancelled.');
    this.cancelRegisterUser.emit(false);
  }

}
