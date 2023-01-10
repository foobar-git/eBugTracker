import { Component, Input, OnInit } from '@angular/core';
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
import { HelperFnService } from 'src/app/_services/helper-fn.service';

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
  @Input() bug: any;
  comments: Comment[];
  commentsNumber: number;
  numberOfComments: number;         // number of comments posted about the bug

  constructor(private http: HttpClient, private route: ActivatedRoute, private authorization: AuthorizationService, private bugsService: BugsService,
    private projectInfo: ProjectInfoComponent, private bugInfo: BugInfoComponent, private helperFn: HelperFnService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBugCard();

    // set bug status

    // authorize user
  }

  loadBugCard() {
    this.getBugById(this.bug.id);
  }

  getBugById(id: number) {
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
      }
    });
  }

  setBugStatus() {
    if (this.bug.edited == true) this.bugEdited = true;
  }

  authorizeUser(user: string) {
    //this.ableToEditBug = this.authorization.userAuthorized(user);         // v22
    this.ableToEditBug = this.authorization.userAuthorized_levelSuperUser(user);
  }

  enableBugEditComponent(b: boolean) {
    this.editBug = b;
  }

  updateBug(id: number, skipReload: boolean) {
    console.log("Updating bug");
    //console.log(this.bug);
    this.bug.edited = true;
    this.bug.dateCompleted = this.helperFn.getCurrentDateTime();
    this.bugsService.editBug(id, this.bug).subscribe(() => {
      this.toastr.success("Bug edited, changes saved.", null, {timeOut: 2000}).onHidden.subscribe(() => {
        if (!skipReload) window.location.reload()
      });
    });
  }

  removeBug() {
    if (window.confirm("Delete this bug?")) {
      if (this.bug.id != null) {
        //console.log(this.bug.id);
        this.removingBugEntry = true;
        this.bugsService.deleteBug(this.bug.projectId, this.bug.id).subscribe(() => {
          this.toastr.success("Bug entry removed.").onHidden.subscribe(
            () => window.location.reload()
          );
        });
      }
      this.resetVariables();
    }
  }

  toggleActive() {
    if (window.confirm("Set bug is active as " + !this.bug.isActive + "?")) {
      this.bug.isActive = !this.bug.isActive;
      this.bug.isResolved = false;
      this.bugEdited = true;
      this.updateBug(this.bug.id, true);
    }
  }
  
  toggleResolved() {
    if (window.confirm("Mark bug resolved as " + !this.bug.isResolved + "?")) {
      this.bug.isResolved = !this.bug.isResolved;
      this.bug.isActive = false;
      this.bugEdited = true;
      this.updateBug(this.bug.id, true);
    }
  }

  closeEditForm() {
    this.resetVariables();
  }

  resetVariables() {
    this.editBug = false;
  }

}
