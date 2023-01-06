import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppProject } from 'src/app/_models/appProject';
import { ProjectsService } from 'src/app/_services/projects.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { ProjectNewComponent } from '../project-new/project-new.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  projects: AppProject[];
  noProjects$: Observable<any>;
  newProject: boolean = false;
  loading: boolean = true;

  constructor(private projectService: ProjectsService, private projectNew: ProjectNewComponent) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.noProjects$ = this.checkForProjectsAsync(this.projects.length); // check if there are any projects in the database
      this.loading = false;
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
