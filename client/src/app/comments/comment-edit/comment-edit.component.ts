import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/_models/comment';
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
  comments: Comment[];
  comment: any;
  commentsNumber: number;                   // comment number - position in array
  editComment: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private commentsService: CommentsService, private toastr: ToastrService,
    private bugInfo: BugInfoComponent) { }

  ngOnInit(): void {
    this.comments = this.bugInfo.comments;
    //console.log(this.comments);
    this.commentsNumber = this.bugInfo.commentsNumber;
    this.comment = this.comments[this.commentsNumber];
    this.bugInfo.updateCommentsNumber();  // needed for advancing to the next comment in comments
  }

  getCommentId(id: number) {
    this.editComment = true;
    //console.log(id);
    this.loadComment(id);
  }

  loadComment(id: number) {
    //console.log(id);
    if (id > 0) this.comment = this.comments[id - 1];
    else this.comment = this.comments[id];
    //console.log(this.comment);
  }

  updateComment(id: number) {
    //console.log(this.comment);
    this.commentsService.editComment(id, this.comment).subscribe(() => {
      this.toastr.success("Comment edited, changes saved.")
      this.editForm.reset(this.comment);         // reset form status, keeping changes for user
      this.editComment = false;
    })
  }

}
