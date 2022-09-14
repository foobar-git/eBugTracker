import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
  projects: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.http.get('https://localhost:5001/api/project').subscribe({ // observables do nothing until subscribed
      next: response => this.projects = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

}
