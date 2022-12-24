import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/_models/comment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Observable, of } from 'rxjs';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { CommentNewComponent } from 'src/app/comments/comment-new/comment-new.component';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-bug-info',
  templateUrl: './bug-info.component.html',
  styleUrls: ['./bug-info.component.css']
})
export class BugInfoComponent implements OnInit {
  writeNewComment: boolean = false;
  bug: any;
  id: number;
  imageURL: string;
  bugImages: string[] = [];
  comments: Comment[];
  commentsLength: number;
  commentsNumber: number;                               // number of comments - when listing comments
  noComments$: Observable<any>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  dateTimeCreated: string;
  dateTimeResolved: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService,
    private commentsService: CommentsService, private commentNew: CommentNewComponent, private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      //console.log(this.id);                           // bug id
    });

    this.getBugId(this.id);
  }

  getBugId(id: number) {
    this.http.get('https://localhost:5001/api/bug/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.bug);
        this.dateTimeCreated = this.helperFn.formatDateTime(this.bug.dateCreated);
        this.dateTimeResolved = this.helperFn.formatDateTime(this.bug.dateResolved);
        this.imageURL = this.bug.imageURL;
        this.bugImages.push(this.bug.bugImage1, this.bug.bugImage2, this.bug.bugImage3, this.bug.bugImage4, this.bug.bugImage5);
        //console.log(this.bugImages);
        this.comments = this.bug.comments;
        this.commentsLength = this.comments.length;

        var length = this.commentsLength;
        if (length > 0) this.commentsNumber = length - 1;
        else this.commentsNumber = 0;
        this.noComments$ = this.checkForCommentsAsync();  // delay the check if there are any comments posted
        
        //console.log(this.commentsNumber);
        //console.log(this.bug);
        //console.log(this.comments);                     // can be used for returning a list of comments
        //console.log(this.bugImages);

        this.galleryImages = this.getImages();
      }
    });
  }

  getImages(): NgxGalleryImage[] {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]
    let runOnce = true;
    const imageUrls = [];
    for (let image of this.bugImages) {
      if (image != "") {                      // check if URL strings are "empty, if so then skip"
        image = "https://localhost:5001/upload/" + image;
        imageUrls.push({
          small: image,
          medium: image,
          big: image
        })
      } else {
        if (runOnce) {
          if (this.imageURL != "") {
            image = this.imageURL;            // if imageURL is not empty, copy the value to the first image
            imageUrls.push({
              small: image,
              medium: image,
              big: image
            })
          }
          runOnce = false;                    // only run it for the first image
        }
        
      }
    }
    return imageUrls;
  }

  checkForCommentsAsync() {
    //console.log(this.commentsNumber);
    //console.log(this.commentsLength);
    if (this.commentsLength > 0) return of(true);
    else return of(false);
  }

  updateCommentsNumber() {
    if(this.commentsNumber > 0) this.commentsNumber--;
  }

  initNewComment() {
    console.log("Writing a new comment...");
    this.writeNewComment = true;
    this.commentNew.newCommentForm();
  }

}
