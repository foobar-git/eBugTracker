import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {
  baseUrl = environment.apiUrl;
  bugs: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBugs();
  }

  getBugs() {
    this.http.get(this.baseUrl + 'bug').subscribe({ // observables do nothing until subscribed
      next: response => this.bugs = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

}
