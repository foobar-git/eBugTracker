import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';

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
}
