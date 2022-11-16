import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/_services/comments.service';
import { NgForm } from '@angular/forms';
import { BugInfoComponent } from 'src/app/bugs/bug-info/bug-info.component';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  newComment: boolean = false;
  comment: any;
  commentsIndexNumber: number;                   // comment number - position in array
  editComment: boolean = false;

  commentTemplate: any = {
    "dateCreated": new Date,
    "postedByUser": this.getUserName(),
    "content": "",
    "appUserId": this.getUserId(),
    "bugId": this.getBugId()
  }

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private commentsService: CommentsService, private toastr: ToastrService,
    private bugInfo: BugInfoComponent) { }

  ngOnInit(): void {
    console.log(this.bugInfo.comments);
    this.commentsIndexNumber = this.bugInfo.commentsNumber;
    console.log(this.commentsIndexNumber);
    this.comment = this.bugInfo.comments[this.commentsIndexNumber];
    //console.log(this.comment.id);
    this.bugInfo.updateCommentsNumber();    // needed for advancing to the next comment in comments
  }

  loadComment() {
    this.newComment = false;
    this.editComment = true;
    this.comment = this.bugInfo.comments[this.commentsIndexNumber];
    console.log(this.comment);
  }

  commitComment(id: number) {
    //console.log(this.comment);

    // update comment
    if (!this.newComment) {
      console.log("UPDATE");
      console.log(this.newComment);
      this.commentsService.editComment(id, this.comment).subscribe(() => {
        this.toastr.success("Comment edited, changes saved.");
        this.editForm.reset(this.comment);         // reset form status, keeping changes for user
      })
    } else {
      // post a new comment
      console.log("NEW ENTRY");
      this.commentsService.newComment(this.commentTemplate).subscribe(() => {
        this.toastr.success("New comment has been posted.");
      })
    }
    // reset variables
    this.newComment = false;
    this.editComment = false;
    this.bugInfo.writeNewComment = false;
  }

  getUserName() {
    return "Nedim";
  }
  
  getUserId() {
    return "2";
  }

  getBugId() {
    return "2";
  }

}
