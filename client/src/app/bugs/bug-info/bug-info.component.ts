import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BugImage } from 'src/app/_models/bugImage';
import { Comment } from 'src/app/_models/comment';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-bug-info',
  templateUrl: './bug-info.component.html',
  styleUrls: ['./bug-info.component.css']
})
export class BugInfoComponent implements OnInit {
  bug: any;
  id: number;
  bugImages: BugImage[];
  comments: Comment[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      console.log(this.id);
    });

    this.getBugId(this.id);
  }

  getBugId(id: number) {
    this.http.get('https://localhost:5001/api/bug/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.bug = response,
      error: error => console.log(error),
      complete: () => {
        this.bugImages = this.bug.bugImages;
        this.comments = this.bug.comments;
        //console.log(this.bug);
        console.log(this.comments);
        console.log(this.comments[0]);             // can be used for returning a list of comments
        //console.log(this.bugImages);
        //console.log(this.bugImages[0].location); // can be used for returning a list of bug images
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

}
