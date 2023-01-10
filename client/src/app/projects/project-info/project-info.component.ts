import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UsersAssigned } from 'src/app/_models/usersAssigned';
import { BugsAssigned } from 'src/app/_models/bugsAssigned';
import { Observable, of } from 'rxjs';
import { HelperFnService } from 'src/app/_services/helper-fn.service';
import { BugNewComponent } from 'src/app/bugs/bug-new/bug-new.component';
import { environment } from 'src/environments/environment';
import { AppUser } from 'src/app/_models/appUser';
import { ProjectsService } from 'src/app/_services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/_services/users.service';
import { AuthorizationService } from 'src/app/_services/authorization.service';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  baseUrl = environment.apiUrl;
  newBugEntry: boolean = false;
  ableToEditProject: boolean = false;
  editProject: boolean = false;
  project: any;
  id: number;
  users: AppUser[];
  usersAssigned: UsersAssigned[];
  bugsAssigned: BugsAssigned[];
  noBugsAssigned$: Observable<any>;
  numberOfBugs: number;
  numberOfUsers: number;
  dateTimeCreated: string;
  dateTimeCompleted: string;
  selectUserOption: boolean = false;
  saving: boolean = false;
  searchText: string = "";

  userAssignedTemplate: any = {
    "userId": "",
    "username": "",
    "userType": "",
    "team": "",
    "projectId": ""
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private helperFn: HelperFnService, private authorization: AuthorizationService,
    private toastr: ToastrService, private projectsService: ProjectsService, private bugNew: BugNewComponent,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      //console.log(this.id);
    });
    this.getProjectById(this.id);
    this.getUsers();
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

  authorizeUser(user: string) {
    this.ableToEditProject = this.authorization.userAuthorized_levelSuperUser(user);
  }

  getProjectById(id: number) {
    this.http.get(this.baseUrl + 'project/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.project = response,
      error: error => console.log(error),
      complete: () => {
        this.authorizeUser(this.project.createdByUser);
        //console.log(this.project.usersAssigned);                          // can be used for returning a list of user names
        //this.usersAssigned = JSON.stringify(this.project.usersAssigned);  // can be used for returning a list of user names
        this.usersAssigned = this.project.usersAssigned;
        this.dateTimeCreated = this.helperFn.formatDateTime(this.project.dateCreated);
        this.dateTimeCompleted = this.helperFn.formatDateTime(this.project.dateCompleted);
        
        this.bugsAssigned = this.project.bugsAssigned;
        this.noBugsAssigned$ = this.checkForBugsAssignedAsync();            // delay the check if there are any comments posted

        //console.log(this.usersAssigned.length);                           // can be used for returning a list of users in project
        this.numberOfUsers = this.usersAssigned.length;
        //console.log(this.bugsAssigned.length);                            // can be used for returning a list of bugs in project
        this.numberOfBugs = this.project.bugsAssigned.length;
      }
    });
  }

  getUsers() {
    this.usersService.getAppUsers().subscribe( users => {
        this.users = users;
        //console.log(this.users);
      },
      error => console.log(error)
    );
  }

  checkForBugsAssignedAsync() {
    return of(this.bugsAssigned.length);
  }

  initNewBug() {
    console.log("New bug entry...");
    //console.log(this.project.id);
    this.newBugEntry = true;
    this.bugNew.newBugForm();
  }

  removeUser(pid: number, uid: number) {
    //console.log("Remove user from project");
    this.setSaving(true);
    this.projectsService.removeUserFromProject(pid, uid).subscribe(() => {
      this.toastr.success("User removed from project", null, {timeOut: 2000}).onHidden.subscribe(
        () => window.location.reload()
      );
    });
  }

  editDescription() {
    //console.log("Edit project description");
    this.enableProjectEditComponent(true);
  }

  enableProjectEditComponent(b: boolean) {
    this.editProject = b;
  }

  closeEditForm() {
    this.resetVariables();
  }
  
  resetVariables() {
    this.editProject = false;
  }

  onChange(selection) {
    this.selectUser(selection.target.value);
    this.setSaving(true);
  }

  selectUser(selection) {
    if (selection != "-") {
      selection = this.helperFn.removeSpacesFromString(selection);
      let username = selection[0];
      // console.log(this.helperFn.getFieldsByString(this.users, username));
      // console.log(this.helperFn.getFieldByString(this.users, username, "id"));
      // console.log(this.helperFn.getFieldByString(this.users, username, "username"));
      // console.log(this.helperFn.getFieldByString(this.users, username, "userType"));
      // console.log(this.helperFn.getFieldByString(this.users, username, "team"));

      let usernamesArray: string[] = [];
      this.usersAssigned.forEach( (element) => {
        //console.log(element["username"]);
        usernamesArray.push(element["username"]);
      });
      usernamesArray.push(username);
      
      if (!this.helperFn.checkIfUserAlreadyAssigned(usernamesArray)) {
        this.userAssignedTemplate.userId = this.helperFn.getFieldByString(this.users, username, "id");
        this.userAssignedTemplate.username = this.helperFn.getFieldByString(this.users, username, "username");
        this.userAssignedTemplate.userType = this.helperFn.getFieldByString(this.users, username, "userType");
        this.userAssignedTemplate.team = this.helperFn.getFieldByString(this.users, username, "team");
        this.userAssignedTemplate.projectId = this.project.id;
        this.addUserToProject();
      }
      else this.toastr.info("User already assigned");
    }
  }

  addUserToProject() {
    this.projectsService.newUsersAssigned(this.userAssignedTemplate).subscribe(() => {
      console.log(this.userAssignedTemplate);
      this.toastr.success("User added: " + this.userAssignedTemplate.username, null, {timeOut: 2000}).onHidden.subscribe(
        () => window.location.reload()
      );
    });
  }

  enableAddUser(b: boolean) {
    this.selectUserOption = b;
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

  updateProject(id: number, skipReload: boolean) {
    //console.log("Updating project...");
    //console.log(this.project);
    //this.setSaving(true);
    this.project.dateCreated = this.helperFn.getCurrentDateTime();
    this.projectsService.editProject(id, this.project).subscribe(() => {
      this.toastr.success("Project edited, changes saved.").onHidden.subscribe(() => {
          if (!skipReload) window.location.reload();
          //else this.setSaving(false); // re-enable the saving button
      });
    });
  }

  removeProject() {
    if (window.confirm("Delete this project?")) {
      if (this.project.id != null) {
        //console.log(this.project.id);
        //this.removingProjectEntry = true;
        this.projectsService.deleteProject(this.project.id).subscribe(() => {
          this.toastr.success("Project deleted", null, {timeOut: 2000}).onHidden.subscribe(
            () => window.location.href="/projects"
          );
        });
      }
      //this.resetVariables();
    }
  }

  toggleOnHold() {
    if (window.confirm("Set project's 'on-hold' as " + !this.project.isOnHold + "?")) {
      this.project.isOnHold = !this.project.isOnHold;
      this.project.isComplete = false;
      this.updateProject(this.project.id, true);
    }
  }
  
  toggleComplete() {
    if (window.confirm("Mark project resolved as " + !this.project.isComplete + "?")) {
      this.project.isComplete = !this.project.isComplete;
      this.project.isOnHold = false;
      this.updateProject(this.project.id, true);
    }
  }

}
