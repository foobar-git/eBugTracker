import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProjectsService } from 'src/app/_services/projects.service';

@Component({
  selector: 'app-project-info-name',
  templateUrl: './project-info-name.component.html',
  styleUrls: ['./project-info-name.component.css']
})
export class ProjectInfoNameComponent implements OnInit {
  baseUrl = environment.apiUrl;
  project: any;
  name: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.name = params.get('name');
      console.log(this.name);
    });
    this.getProject(this.name);
  }

  getProject(name: string) {
    this.projectsService.getProject(name).subscribe({
      next: response => this.project = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

}
