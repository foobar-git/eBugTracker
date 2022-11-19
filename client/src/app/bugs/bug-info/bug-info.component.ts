import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BugImage } from 'src/app/_models/bugImage';
import { Comment } from 'src/app/_models/comment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Observable, of } from 'rxjs';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { CommentEditComponent } from 'src/app/comments/comment-edit/comment-edit.component';
import { CommentNewComponent } from 'src/app/comments/comment-new/comment-new.component';

@Component({
  selector: 'app-bug-info',
  templateUrl: './bug-info.component.html',
  styleUrls: ['./bug-info.component.css']
})
export class BugInfoComponent implements OnInit {
  @ViewChild('commentEditComponent') commentEditComponent: CommentEditComponent;
  writeNewComment: boolean = false;
  bug: any;
  id: number;
  bugImages: BugImage[];
  comments: Comment[];
  commentsLength: number;
  commentsNumber: number;                               // number of comments - when listing comments
  noComments$: Observable<any>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private commentsService: CommentsService, private commentNew: CommentNewComponent,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      //console.log(this.id);                           // bug id
    });

    this.getBugId(this.id);
  }

  ngAfterViewInit() {
    //this.id = this.commentNew.bugId;
  }

  getBugId(id: number) {
    this.http.get('https://localhost:5001/api/bug/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        console.log(this.bug);
        this.bugImages = this.bug.bugImages;
        this.comments = this.bug.comments;
        this.commentsLength = this.comments.length;

        var length = this.commentsLength;
        if (length > 0) this.commentsNumber = length - 1;
        else {
          this.commentsNumber = 0;
        }
        this.noComments$ = this.checkForCommentsAsync();  // delay the check if there are any comments posted
        
        //console.log(this.commentsNumber);
        //console.log(this.bug);
        //console.log(this.comments);                     // can be used for returning a list of comments
        //console.log(this.bugImages);
        //console.log(this.bugImages[0].location);        // can be used for returning a list of bug images
        this.galleryImages = this.getImages();
      }
    })
  }

  getImages(): NgxGalleryImage[] {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    const imageUrls = [];
    for (const image of this.bugImages) {
      imageUrls.push({
        //small: image.url,
        small: image?.location,
        medium: image?.location,
        big: image?.location
      })
    }
    return imageUrls;
  }

  checkForCommentsAsync() {
    console.log(this.commentsNumber);
    console.log(this.commentsLength);
    if (this.commentsLength > 0) return of(true);
    else return of(false);
  }

  updateCommentsNumber() {
    if(this.commentsNumber > 0) this.commentsNumber--;
  }

  initNewComment() {
    console.log("Write a new comment!");
    //this.commentEditComponent.newComment = true;
    this.writeNewComment = true;
    //this.commentNewComponent.newCommentForm();
    this.commentNew.newCommentForm();

    // this.commentsService.newComment(newComment).subscribe(() => {
    //   this.toastr.success("New comment has been posted.");
    // })

  }

  async testFn_sleepTimer(s: number) {
    var t = s * 1000;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    await sleep(t);
    console.log("paused for " + s + " seconds.");
  }

}
