import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  project: any;
  id: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      console.log(this.id);
    });
    this.getProjectId(this.id);
  }

  getProjectId(id: number) {
    this.http.get('https://localhost:5001/api/project/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.project = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

}
