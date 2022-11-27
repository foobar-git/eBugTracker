import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BugsAssigned } from 'src/app/_models/bugsAssigned';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  id: number;
  bugs: any;
  bugsByThisUser: any[] = [];
  dateTimeCreated: string;
  dateTimeLastActive: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      console.log(this.id);
    });
    this.getUserId(this.id);
    //this.getBugs();             // v15
  }

  getUserId(id: number) {
    this.http.get('https://localhost:5001/api/users/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.user = response,
      error: error => console.log(error),
      complete: () => {
        this.getBugsByThisUser(this.user.username);
        this.dateTimeCreated = this.helperFn.formatDateTime(this.user.dateCreated);
        this.dateTimeLastActive = this.helperFn.formatDateTime(this.user.lastActive);
      }
    });
  }

  getBugsByThisUser(uname: string) {
    this.http.get('https://localhost:5001/api/bug').subscribe({ // observables do nothing until subscribed
      next: response => this.bugs = response,
      error: error => console.log(error),
      complete: () => {
        console.log(uname);
        this.bugs.forEach(item => {
          if (this.bugs[this.bugs.indexOf(item)].filedByUser === uname) this.bugsByThisUser.push(item);
        });
        console.log(this.bugsByThisUser);
      }
    });
  }
}
