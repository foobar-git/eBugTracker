import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { CommentsService } from 'src/app/_services/comments.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
  newComment: boolean = false;
  currentUserName: string;                // populated by AccountService
  currentUserId: number;
  //currentUserType: string;                // implemented as string only for development -should be as numbers in produciton (admin = 0, etc.)
  @Input() bugId: number;

  commentTemplate: any = {
    "dateCreated": "",
    "postedByUser": "",
    "content": "",
    "appUserId": "",
    "bugId": "",
    "edited": false
  }

  constructor(private commentsService: CommentsService, private toastr: ToastrService, private http: HttpClient,
    private authorization: AuthorizationService, private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.currentUserName = this.authorization.currentLoggedInUser.username;
    //console.log(this.currentUser);
    //console.log(this.bugId);
    this.newCommentForm();
  }

  newCommentForm() {
    this.getDate();
    this.commentTemplate.postedByUser = this.currentUserName;
    this.newComment = true;
  }

  saveNewComment() {
    // save the new comment
    this.getDate();
    this.currentUserId = this.authorization.userId;
    this.commentTemplate.appUserId = this.currentUserId;
    this.commentTemplate.bugId = this.bugId;

    //console.log(this.commentTemplate);
    this.commentsService.newComment(this.commentTemplate).subscribe(() => {
      this.toastr.success("New comment has been posted.");
    })
    // reset variables
    this.newComment = false;
  }

  getDate() {
    this.commentTemplate.dateCreated = this.helperFn.getCurrentDateTime();
  }

}
