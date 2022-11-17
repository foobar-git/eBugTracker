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
  comment: any;
  commentsIndexNumber: number;                   // comment number - position in array
  editComment: boolean = false;

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
    this.editComment = true;
    this.comment = this.bugInfo.comments[this.commentsIndexNumber];
    console.log(this.comment);
  }

  commitComment(id: number) {
    //console.log(this.comment);
    // update comment
    console.log("UPDATE");
    this.commentsService.editComment(id, this.comment).subscribe(() => {
      this.toastr.success("Comment edited, changes saved.");
      this.editForm.reset(this.comment);         // reset form status, keeping changes for user
    })
    // reset variables
    this.editComment = false;
  }

}
