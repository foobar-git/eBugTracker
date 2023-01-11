import { Component, OnInit } from '@angular/core';
import { AppProject } from 'src/app/_models/appProject';
import { ProjectsService } from 'src/app/_services/projects.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { ProjectNewComponent } from '../project-new/project-new.component';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  searchText: string = "";
  projects: AppProject[];
  noProjects$: Observable<any>;
  newProject: boolean = false;
  ableToCreateNewProject: boolean = false;
  loading: boolean = true;
  user: any;

  constructor(private authorization: AuthorizationService, private userService: UsersService,
    private projectService: ProjectsService, private projectNew: ProjectNewComponent) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

  getUserByUsername() {
    let user: User = JSON.parse(localStorage.getItem('user')); // get user data from local storage and
    return this.userService.getAppUser(user.username);
  }

  authorizeUser(user: string) {
    this.ableToCreateNewProject = this.authorization.userAuthorized_levelSuperUser(user);
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.noProjects$ = this.checkForProjectsAsync(this.projects.length); // check if there are any projects in the database
      this.loading = false;
      this.user = this.getUserByUsername();
      this.authorizeUser(this.user);
    });
  }

  checkForProjectsAsync(l: number) {
    //console.log(l);
    if (l > 0) return of(true);
    else return of(false);
  }

  initNewProject() {
    console.log("Create new project..");
    this.newProject = true;
    this.projectNew.newProjectForm();
  }

}
