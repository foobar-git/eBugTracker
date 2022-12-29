import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  baseUrl = environment.apiUrl;
  comment: any;
  id: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      console.log(this.id);
    });
    this.getCommentId(this.id);
  }

  getCommentId(id: number) {
    this.http.get(this.baseUrl + 'comment/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.comment = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.comment.foobar);
        //this.usersAssigned = JSON.stringify(this.project.usersAssigned);  // can be used for returning a list of user names
        //this.usersAssigned = this.project.usersAssigned;
      }
    })
  }

}
