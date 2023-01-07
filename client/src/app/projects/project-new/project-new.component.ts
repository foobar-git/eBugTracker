import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';
import { ProjectsService } from 'src/app/_services/projects.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  currentUserId: number;
  currentUserName: string;
  newProject: boolean = false;
  saving: boolean = false;

  projectTemplate: any = {
    "name": "",
    "createdByUser": "",
    "dateCreated": "",
    "dateCompleted": "1901-01-01",
    "isComplete": false,
    "isOnHold": false,
    "description": ""
  }

  constructor(private authorization: AuthorizationService, private helperFn: HelperFnService,
    private toastr: ToastrService, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.currentUserName = this.authorization.currentLoggedInUser.username;
    this.newProjectForm();
  }

  newProjectForm() {
    this.getDateCreated();
    this.projectTemplate.createdByUser = this.currentUserName;
    this.newProject = true;
  }

  saveNewProject() {
    this.getDateCreated();
    this.saveProject();
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

  saveProject() {
    // save the new project
    this.setSaving(true);
    this.currentUserId = this.authorization.userId;
    this.projectTemplate.appUserId = this.currentUserId;

    //console.log(this.projectTemplate);
    this.projectsService.newProject(this.projectTemplate).subscribe(() => {
      console.log(this.projectTemplate);
      this.toastr.success("New project has been created.", null, {timeOut: 2000})
        .onHidden.subscribe(() => window.location.reload());
    });
    // reset variables
    //this.newProject = false;
  }

  getDateCreated() {
    this.projectTemplate.dateCreated = this.helperFn.getCurrentDateTime();
  }

  getDateCompleted() {
    this.projectTemplate.dateCompleted = this.helperFn.getCurrentDateTime();
  }

}
