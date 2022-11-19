import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/_services/comments.service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
  newComment: boolean = false;

  commentTemplate: any = {
    "dateCreated": new Date,
    "postedByUser": this.getUserName(),
    "content": "",
    "appUserId": this.getUserId(),
    "bugId": this.getBugId()
  }

  constructor(private commentsService: CommentsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.newCommentForm();
  }

  newCommentForm() {
    console.log("NEW ENTRY");
    this.newComment = true;
  }

  saveNewComment() {
    // save the new comment
    this.commentsService.newComment(this.commentTemplate).subscribe(() => {
      this.toastr.success("New comment has been posted.");
    })
    // reset variables
    this.newComment = false;
  }

  getUserName() {
    return "Ensar";
  }
  
  getUserId() {
    return "3";
  }

  getBugId() {
    return "3";
  }

}
