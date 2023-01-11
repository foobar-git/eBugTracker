import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/_models/comment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Observable, of } from 'rxjs';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { CommentNewComponent } from 'src/app/comments/comment-new/comment-new.component';
import { HelperFnService } from 'src/app/_services/helper-fn.service';
import { environment } from 'src/environments/environment';
import { BugImageIndex } from 'src/app/_models/bugImageIndex';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { BugsService } from 'src/app/_services/bugs.service';

@Component({
  selector: 'app-bug-info',
  templateUrl: './bug-info.component.html',
  styleUrls: ['./bug-info.component.css']
})
export class BugInfoComponent implements OnInit {
  baseUrl = environment.apiUrl;
  ableToEditBug: boolean = false;
  writeNewComment: boolean = false;
  bug: any;
  id: number;
  editBug: boolean = false;
  bugEdited: boolean;
  imageURL1: string;
  imageURL2: string;
  bugImages: string[] = [];
  bugImagesLength: number;
  biIndex = BugImageIndex;
  noImages$: Observable<any>;
  hideGallery: boolean = true;
  comments: Comment[];
  commentsLength: number;
  commentsNumber: number;                               // number of comments - when listing comments
  noComments$: Observable<any>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  dateTimeCreated: string;
  dateTimeResolved: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService, private authorization: AuthorizationService,
    private commentsService: CommentsService, private bugsService: BugsService, private commentNew: CommentNewComponent, private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      //console.log(this.id);                                               // bug id
    });

    this.getBugById(this.id);
  }

  authorizeUser(user: string) {
    this.ableToEditBug = this.authorization.userAuthorized_levelSuperUser(user);
  }

  getBugById(id: number) {
    this.bugsService.getBugById(id).subscribe({     // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.bug);
        this.authorizeUser(this.bug.filedByUser);
        this.dateTimeCreated = this.helperFn.formatDateTime(this.bug.dateCreated);
        this.dateTimeResolved = this.helperFn.formatDateTime(this.bug.dateResolved);
        this.bugEdited = this.bug.edited;
        this.setBugImages();
        //console.log(this.bugImages);
        this.comments = this.bug.comments;
        this.commentsLength = this.comments.length;

        var length = this.commentsLength;
        if (length > 0) this.commentsNumber = length - 1;
        else this.commentsNumber = 0;
        this.noComments$ = this.checkForCommentsAsync(this.commentsLength); // check if any comments posted
        
        //console.log(this.commentsNumber);
        //console.log(this.bug);
        //console.log(this.comments);                                       // can be used for returning a list of comments

        this.galleryImages = this.getImages();
        this.bugImagesLength = this.galleryImages.length;
        this.noImages$ = this.checkForImagesAsync(this.bugImagesLength);
      }
    });
  }

  getImages(): NgxGalleryImage[] {
    let pid = this.bug.projectId;
    let bid = this.bug.id;
    this.galleryOptions = [ {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]
    const imagesArray = [];
    for (let image of this.bugImages) {
      if (image != "") {                      // check if URL strings are "empty, if so then skip"
        if (image === "default") image = this.baseUrl + "default/image.png";
        else image = this.baseUrl + "upload/" + pid + "/" + bid + "/" + image;
        
        imagesArray.push({
          small: image,
          medium: image,
          big: image
        });
      }
    }
    //console.log(this.bug.imageURL1);
    //console.log(this.bug.imageURL2);
    if (this.bug.imageURL1 != "") imagesArray.push({
      small: this.bug.imageURL1,
      medium: this.bug.imageURL1,
      big: this.bug.imageURL1
    });
    if (this.bug.imageURL2 != "") imagesArray.push({
      small: this.bug.imageURL2,
      medium: this.bug.imageURL2,
      big: this.bug.imageURL2
    });
    //console.log(imagesArray);
    return imagesArray;
  }

  checkForCommentsAsync(l: number) {
    //console.log(l);
    if (l > 0) return of(true);
    else return of(false);
  }

  checkForImagesAsync(l: number) {
    //console.log(l);
    if (l > 0) {
      this.hideGallery = false;
      return of(true);
    }
    else return of(false);
  }

  updateCommentsNumber() {
    if(this.commentsNumber > 0) this.commentsNumber--;
  }

  initNewComment() {
    //console.log("Writing a new comment...");
    this.writeNewComment = true;
    this.commentNew.newCommentForm();
  }

  setBugImages() {
    const biiLength = Object.keys(this.biIndex).length / 2;     // dividing by two to get the correct length because
    //console.log(biiLength);                                   // the enum biIndex is made of numerical values
    for (let i = 1; i <= biiLength; i++) {
      let n = this.biIndex[i];
      //console.log(this.bug[n]);
      this.bugImages.push(this.bug[n]);
      //console.log(this.bugImages[i-1]);
    }
  }

  enableBugEditComponent(b: boolean) {
    this.editBug = b;
  }

  closeEditForm() {
    this.resetVariables();
  }
  
  resetVariables() {
    this.editBug = false;
  }

}
