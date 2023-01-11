import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BugsService } from 'src/app/_services/bugs.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {
  searchText: string = "";
  baseUrl = environment.apiUrl;
  bugs: any;

  constructor(private http: HttpClient, private bugsService: BugsService) { }

  ngOnInit(): void {
    this.getAllBugs();
  }

  getAllBugs() {
    this.bugsService.getBugs().subscribe({ // observables do nothing until subscribed
      next: response => this.bugs = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

}
