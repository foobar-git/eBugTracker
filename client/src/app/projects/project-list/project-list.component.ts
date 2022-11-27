import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppProject } from 'src/app/_models/appProject';
import { ProjectsService } from 'src/app/_services/projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  appProjects: AppProject[];

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAppProjects().subscribe(projects => {
      this.appProjects = projects;
    })
  }

}
