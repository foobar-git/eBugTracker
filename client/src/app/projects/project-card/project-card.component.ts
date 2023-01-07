import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppProject } from 'src/app/_models/appProject';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';
import { ProjectsService } from 'src/app/_services/projects.service';
import { ProjectInfoComponent } from '../project-info/project-info.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: AppProject;
  @Input() numberOfBugs: number;
  ableToEditProject: boolean = false;
  editProject: boolean = false;

  constructor(private authorization: AuthorizationService, private helperFn: HelperFnService,
    private toastr: ToastrService, private projectsService: ProjectsService, private projectInfo: ProjectInfoComponent) { }

  ngOnInit(): void {
    this.authorizeUser(this.project.createdByUser);
  }

  authorizeUser(user: string) {
    //this.ableToEditBug = this.authorization.userAuthorized(user);         // v22
    this.ableToEditProject = this.authorization.userAuthorized_levelSuperUser(user);
  }

  updateProject(id: number, skipReload: boolean) {
    //console.log("Updating project...");
    //console.log(this.project);
    this.project.dateCreated = this.helperFn.getCurrentDateTime();
    this.projectsService.editProject(id, this.project).subscribe(() => {
      this.toastr.success("Project edited, changes saved.").onHidden.subscribe(() => {
          if (!skipReload) window.location.reload();
      });
    });
  }

  toggleOnHold() {
    if (window.confirm("Set project's 'on-hold' status as " + !this.project.isOnHold + "?")) {
      this.project.isOnHold = !this.project.isOnHold;
      this.project.isComplete = false;
      this.updateProject(this.project.id, true);
    }
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

}
