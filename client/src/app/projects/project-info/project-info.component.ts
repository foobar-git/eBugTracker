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


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  baseUrl = environment.apiUrl;
  newBugEntry: boolean = false;
  project: any;
  id: number;
  users: AppUser[];
  usersAssigned: UsersAssigned[];
  bugsAssigned: BugsAssigned[];
  bugsAssignedNumber: number;                 // number of bugs - when listing bugs in cards
  bugIdIndex: number = 0;                     // bug index - position in array when loading bugs by id
  noBugsAssigned$: Observable<any>;
  numberOfBugs: number;
  numberOfUsers: number;
  dateTimeCreated: string;
  dateTimeCompleted: string;
  selectUserOption: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private helperFn: HelperFnService,
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

  getProjectById(id: number) {
    this.http.get(this.baseUrl + 'project/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.project = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.project.usersAssigned);                          // can be used for returning a list of user names
        //this.usersAssigned = JSON.stringify(this.project.usersAssigned);  // can be used for returning a list of user names
        this.usersAssigned = this.project.usersAssigned;
        console.log(this.usersAssigned);
        this.dateTimeCreated = this.helperFn.formatDateTime(this.project.dateCreated);
        this.dateTimeCompleted = this.helperFn.formatDateTime(this.project.dateCompleted);
        
        this.bugsAssigned = this.project.bugsAssigned;
        //this.bugsAssigned = this.bugsAssigned.reverse();
        this.bugIdIndex = this.bugsAssigned.length - 1;                     // getting the last index first
        
        var length = this.bugsAssigned.length;
        if (length > 0) this.bugsAssignedNumber = length - 1;
        else {
          this.bugsAssignedNumber = 0;
        }
        this.noBugsAssigned$ = this.checkForbugsAssignedAsync();            // delay the check if there are any comments posted
        
        //console.log(this.usersAssigned.length);                           // can be used for returning a list of users in project
        this.numberOfUsers = this.usersAssigned.length;
        //console.log(this.bugsAssigned.length);                            // can be used for returning a list of bugs in project
        this.numberOfBugs = this.bugsAssigned.length;
      }
    })
  }

  getUsers() {
    this.usersService.getAppUsers().subscribe( users => {
        this.users = users;
        //console.log(this.users);
      },
      error => console.log(error)
    );
  }

  checkForbugsAssignedAsync() {
    return of(this.bugsAssignedNumber);
  }

  updateBugsNumber() {
    if(this.bugsAssignedNumber > 0) this.bugsAssignedNumber--;
  }

  updateBugIdIndex() {
    this.bugIdIndex--;                                    // when accessing array by index, start from last element and count down
  }

  initNewBug() {
    console.log("New bug entry...");
    console.log(this.project.id);
    this.newBugEntry = true;
    this.bugNew.newBugForm();
  }

  addUser() {
    console.log("Add user to project");
  }

  removeUser() {
    console.log("Remove user from project");
  }

  editDescription() {
    console.log("Edit project description");
  }

  onChange(selection) {
    //let option = selection.target.value;
    let option = selection.target.value;
    if (option != "-") {
      let strArray = option.split(" ");
      console.log(strArray[0]);
      console.log(this.users);
      console.log(this.getFieldsByString(strArray[0]));
      console.log(this.getFieldByString(strArray[0], "userType"));
    }
  }

  getFieldsByString(byString: string) {
    return this.users.filter((data) => data.username === byString);
  }

  getFieldByString(byString: string, byFieldName: string) {
    return this.users.filter((data)=> data.username === byString).map((field) => field[byFieldName]);
  }

  enableAddUser(b: boolean) {
    this.selectUserOption = b;
  }

  updateProject(id: number, skipReload: boolean) {
    //console.log("Updating project...");
    //console.log(this.bug);
    //this.setSaving(true);
    this.project.edited = true;
    this.project.dateCreated = this.helperFn.getCurrentDateTime();
    this.projectsService.editProject(id, this.project).subscribe(() => {
      this.toastr.success("Project edited, changes saved.").onHidden.subscribe(() => {
          // if (!skipReload) window.location.reload();
          // else this.setSaving(false); // re-enable the saving button
          window.location.reload();
        }
      );
    });
  }

}
