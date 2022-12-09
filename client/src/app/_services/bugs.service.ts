import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppBug } from '../_models/appBug';
import { AppBugNew } from '../_models/appBugNew';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  baseUrl = environment.apiUrl;
  comments: Comment[] = [];

  constructor(private http: HttpClient) { }

  editBug(id: number, bug: AppBug) {
    //console.log(bug);
    return this.http.put(this.baseUrl + 'bug/id/' + id, bug);
  }

  deleteBug(id: number) {
    return this.http.delete(this.baseUrl + 'bug/db/' + id);
  }
  
  newBug(bug: AppBugNew) {
    //console.log(bug);
    return this.http.put(this.baseUrl + 'comment/nc/', bug);
  }

}
