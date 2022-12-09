import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { BugsService } from 'src/app/_services/bugs.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-bug-new',
  templateUrl: './bug-new.component.html',
  styleUrls: ['./bug-new.component.css']
})
export class BugNewComponent implements OnInit {
  newBug: boolean = false;
  currentUserName: string;
  currentUserId: number;
  @Input() projectId: number;

  bugTemplate: any = {
    "name": "",
    "filedByUser": "",
    "dateCreated": "",
    "dateResolved": "",
    "description": "",
    "isResolved": false,
    "isActive": true,
    "projectId": "",
  }

  constructor(private helperFn: HelperFnService, private authorization: AuthorizationService,
    private bugsService: BugsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUserName = this.authorization.currentLoggedInUser.username;
    //this.newBugForm();    EDIT
  }

  newBugForm() {
    this.getDate();
    this.bugTemplate.filedByUser = this.currentUserName;
    this.newBug = true;
  }

  saveNewBug() {
    // save the new bug
    this.getDate();
    this.currentUserId = this.authorization.userId;
    this.bugTemplate.appUserId = this.currentUserId;
    this.bugTemplate.projectId = this.projectId;

    //console.log(this.bugTemplate);
    this.bugsService.newBug(this.bugTemplate).subscribe(() => {
      this.toastr.success("New bug entry has been posted.");
    })
    // reset variables
    this.newBug = false;
  }

  getDate() {
    this.bugTemplate.dateCreated = this.helperFn.getCurrentDateTime();
  }

}
