import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/_services/comments.service';
import { NgForm } from '@angular/forms';
import { BugInfoComponent } from 'src/app/bugs/bug-info/bug-info.component';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ableToEditComment: boolean = false;
  comment: any;
  commentsIndexNumber: number;            // comment number - position in array
  editComment: boolean = false;
  commentEdited: boolean = false;
  dateTime: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService,
    private commentsService: CommentsService, private authorization: AuthorizationService,
    private bugInfo: BugInfoComponent,  private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.getCommentIndexNumber();
    
    this.setCommentStatus();

    this.authorizeUser();

    this.bugInfo.updateCommentsNumber();         // needed for advancing to the next comment in comments

    this.dateTime = this.helperFn.formatDateTime(this.comment.dateCreated);
  }

  loadComment() {
    if (this.ableToEditComment) this.editComment = true;
    this.comment = this.bugInfo.comments[this.commentsIndexNumber];
    //console.log(this.comment);
    //console.log(this.comment.edited);
  }

  commitComment(id: number) {
    // update comment
    this.comment.edited = true;
    this.comment.dateCreated = this.helperFn.getCurrentDateTime();
    this.commentsService.editComment(id, this.comment).subscribe(() => {
      this.toastr.success("Comment edited, changes saved.");
      this.editForm.reset(this.comment);         // reset form status, keeping changes for user
    })
    this.resetVariables();
  }

  resetVariables() {
    this.commentEdited = true;
    this.editComment = false;
  }

  getCommentIndexNumber() {
    //console.log(this.bugInfo.comments);
    this.commentsIndexNumber = this.bugInfo.commentsNumber;
    //console.log(this.commentsIndexNumber);
    this.comment = this.bugInfo.comments[this.commentsIndexNumber];
  }

  setCommentStatus() {
    if (this.comment.edited == true) this.commentEdited = true;
  }

  authorizeUser() {
    this.ableToEditComment = this.authorization.userAuthorized(this.comment.postedByUser);
  }

  removeComment() {
    this.loadComment();
    if (this.comment.id != null) {
      //console.log(this.comment.id);
      this.commentsService.deleteComment(this.comment.id).subscribe(() => {
        this.toastr.success("Comment deleted.");
        window.location.reload();
      });
    }
    this.resetVariables();
  }

}
