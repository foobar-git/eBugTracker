import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-info-name',
  templateUrl: './project-info-name.component.html',
  styleUrls: ['./project-info-name.component.css']
})
export class ProjectInfoNameComponent implements OnInit {
  project: any;
  name: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.name = params.get('name');
      console.log(this.name);
    });
    this.getProject(this.name);
  }

  getProject(name: string) {
    this.http.get('https://localhost:5001/api/project/' + name).subscribe({ // observables do nothing until subscribed
      next: response => this.project = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }
}
