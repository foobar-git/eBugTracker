import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {
  bugs: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBugs();
  }

  getBugs() {
    this.http.get('https://localhost:5001/api/bug').subscribe({ // observables do nothing until subscribed
      next: response => this.bugs = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

}
