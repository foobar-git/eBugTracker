import { Component, OnInit } from '@angular/core';
import { BugsAssigned } from 'src/app/_models/bugsAssigned';
import { Comment } from 'src/app/_models/comment';
import { ProjectInfoComponent } from 'src/app/projects/project-info/project-info.component';
import { BugInfoComponent } from '../bug-info/bug-info.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BugsService } from 'src/app/_services/bugs.service';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.css']
})
export class BugCardComponent implements OnInit {
  baseUrl = environment.apiUrl;
  removingBugEntry: boolean = false;
  ableToEditBug: boolean = false;
  editBug: boolean = false;
  bugEdited: boolean = false;
  id: number;
  bug_p: any;                       // bug loaded from profile-info component
  bug: any;
  bugsNumber: number;
  bugIdIndex: number;
  comments: Comment[];
  commentsNumber: number;
  numberOfComments: number;         // number of comments posted about the bug

  constructor(private http: HttpClient, private route: ActivatedRoute, private authorization: AuthorizationService, private bugsService: BugsService,
    private projectInfo: ProjectInfoComponent, private bugInfo: BugInfoComponent, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBugCard();

    // set bug status

    // authorize user
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
    //console.log(id);
    this.http.get(this.baseUrl + 'bug/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.bug);
        this.setBugStatus();
        this.authorizeUser(this.bug.filedByUser);
        this.comments = this.bug.comments;
        //console.log(this.comments);
        this.numberOfComments = this.comments.length;
        //console.log(this.numberOfComments);
        return;
      }
    })
  }

  setBugStatus() {
    if (this.bug.edited == true) this.bugEdited = true;
  }

  authorizeUser(user: string) {
    //this.ableToEditBug = this.authorization.userAuthorized(user);         // v22
    this.ableToEditBug = this.authorization.userAuthorized_levelSuperUser(user);
  }

  enableBugEditComponent() {
    this.editBug = true;
  }

  removeBug() {
    //if (this.ableToEditBug) this.editBug = true;
    if (window.confirm("Delete this bug?")) {
      if (this.bug.id != null) {
        //console.log(this.bug.id);
        this.removingBugEntry = true;
        this.bugsService.deleteBug(this.bug.id).subscribe(() => {
          this.toastr.success("Bug entry removed.").onHidden.subscribe(
            () => window.location.reload()
          );
        });
      }
    }
    this.resetVariables();
  }

  resetVariables() {
    this.bugEdited = true;
    this.editBug = false;
  }

}
