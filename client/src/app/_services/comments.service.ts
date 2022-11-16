import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';
import { CommentNew } from '../_models/commentNew';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = environment.apiUrl;
  comments: Comment[] = [];

  constructor(private http: HttpClient) { }

  editComment(id: number, comment: Comment) {
    //console.log(comment);
    return this.http.put(this.baseUrl + 'comment/id/' + id, comment);
  }
  
  newComment(comment: CommentNew) {
    //console.log(comment);
    return this.http.put(this.baseUrl + 'comment/nc/', comment);
  }
}
