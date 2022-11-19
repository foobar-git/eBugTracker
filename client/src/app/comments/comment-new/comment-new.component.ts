import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CommentsService } from 'src/app/_services/comments.service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
  newComment: boolean = false;
  currentUser: User;                        // populated by AccountService
  user: any;
  @Input() bugId: number;

  commentTemplate: any = {
    "dateCreated": "GET CURRENT DATE",
    "postedByUser": "GET CURRENT USER-NAME",
    "content": "",
    "appUserId": "GET CURRENT USER-ID",
    "bugId": "GET CURRENT BUG-ID"
  }

  constructor(private commentsService: CommentsService, private toastr: ToastrService, private http: HttpClient,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(appUser => this.currentUser = appUser);
    }

  ngOnInit(): void {
    console.log(this.bugId);
    this.newCommentForm();
  }

  newCommentForm() {
    console.log("NEW ENTRY");
    this.commentTemplate.dateCreated = new Date;
    this.commentTemplate.postedByUser = this.currentUser.username;
    this.getUserIdAsync(this.currentUser.username);
    this.commentTemplate.bugId = this.bugId;
    this.newComment = true;
  }

  saveNewComment() {
    // save the new comment
    this.commentTemplate.dateCreated = new Date;
    this.commentsService.newComment(this.commentTemplate).subscribe(() => {
      this.toastr.success("New comment has been posted.");
    })
    // reset variables
    this.newComment = false;
  }
  
  getUserIdAsync(username: string) {
    this.http.get('https://localhost:5001/api/users/' + username).subscribe({ // observables do nothing until subscribed
      next: response => this.user = response,
      error: error => console.log(error),
      complete: () => {
        //this.getBugsByThisUser(this.user.username);
        this.commentTemplate.appUserId = this.user.id;
        console.log(this.commentTemplate.appUserId);
      }
    });
  }

}
