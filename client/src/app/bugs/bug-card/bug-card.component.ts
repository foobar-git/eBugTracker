import { Component, OnInit } from '@angular/core';
import { BugsAssigned } from 'src/app/_models/bugsAssigned';
import { Comment } from 'src/app/_models/comment';
import { ProjectInfoComponent } from 'src/app/projects/project-info/project-info.component';
import { BugInfoComponent } from '../bug-info/bug-info.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.css']
})
export class BugCardComponent implements OnInit {
  id: number;
  bug_p: any;                       // bug loaded from profile-info component
  bug: any;
  bugsNumber: number;
  bugIdIndex: number;
  comments: Comment[];
  commentsNumber: number;
  numberOfComments: number;         // number of comments posted about the bug

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private projectInfo: ProjectInfoComponent, private bugInfo: BugInfoComponent) { }

  ngOnInit(): void {
    this.loadBugCard();
  }

  loadBugCard() {
    //console.log(this.projectInfo.bugsAssigned);

    this.bugsNumber = this.projectInfo.bugsAssignedNumber;
    this.bug_p = this.projectInfo.bugsAssigned[this.bugsNumber];
    this.projectInfo.updateBugsNumber();
    //console.log(this.bugsNumber);

    this.bugIdIndex = this.projectInfo.bugIdIndex;
    this.projectInfo.updateBugIdIndex();

    //console.log(this.projectInfo.bugsAssigned[this.bugIdIndex].id);
    this.getBugId(this.projectInfo.bugsAssigned[this.bugIdIndex].id);
  }

  getBugId(id: number) {
    console.log(id);
    this.http.get('https://localhost:5001/api/bug/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.bug);
        this.comments = this.bug.comments;
        //console.log(this.comments);
        this.numberOfComments = this.comments.length;
        //console.log(this.numberOfComments);
        return this.numberOfComments;
      }
    })
  }

}
