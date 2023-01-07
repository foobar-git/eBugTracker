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
  saving: boolean = false;
  newBug: boolean = false;
  currentUserName: string;
  currentUserId: number;
  @Input() projectId: number;

  bugTemplate: any = {
    "name": "",
    "filedByUser": "",
    "dateCreated": "",
    "dateResolved": "1901-01-01",
    "description": "",
    "imageURL1": "",
    "imageURL2": "",
    "bugImage1": "",
    "bugImage2": "",
    "isResolved": false,
    "isActive": true,
    "projectId": "",
  }

  constructor(private helperFn: HelperFnService, private authorization: AuthorizationService,
    private bugsService: BugsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUserName = this.authorization.currentLoggedInUser.username;
    this.newBugForm();
  }

  newBugForm() {
    this.getDateCreated();
    this.bugTemplate.filedByUser = this.currentUserName;
    this.newBug = true;
  }

  saveNewBug() {
    this.getDateCreated();
    this.saveBug();
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

  saveBug() {
    // save the new bug
    this.setSaving(true);
    this.currentUserId = this.authorization.userId;
    this.bugTemplate.appUserId = this.currentUserId;
    this.bugTemplate.projectId = this.projectId;

    //console.log(this.bugTemplate);
    this.bugsService.newBug(this.projectId, this.bugTemplate).subscribe(() => {
      //console.log(this.bugTemplate);
      this.toastr.success("New bug entry has been posted.", null, {timeOut: 2000})
        .onHidden.subscribe(() => window.location.reload());
    });
    // reset variables
    //this.newBug = false;
  }

  getDateCreated() {
    this.bugTemplate.dateCreated = this.helperFn.getCurrentDateTime();
  }

  getDateResolved() {
    this.bugTemplate.dateResolved = this.helperFn.getCurrentDateTime();
  }

}
