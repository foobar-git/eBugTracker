import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { UsersService } from 'src/app/_services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @ViewChild('editForm') editForm: NgForm;
  //currentUser: User;                      // populated by AccountService  // v20
  user: any;
  user$: Observable<any>;
  isAdmin: boolean = false;
  saving: boolean = false;

  constructor(private userService: UsersService, private authorization: AuthorizationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authorization.userAuthorization$.subscribe(userType => this.isAdmin = userType);
    this.authorization.userData$.subscribe(user => this.user = user);
  }

  updateUser() {
    //console.log(this.user);
    this.setSaving(true);
    this.userService.updateAppUser(this.user).subscribe(() => {
      this.toastr.success("Profile edited, changes saved.").onHidden.subscribe(() => {
        this.setSaving(false); // re-enable the saving button
      }
    );
      this.editForm.reset(this.user);       // reset form status, keeping changes for user
    });
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

}
