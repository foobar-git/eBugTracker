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

  getBugs() {
    return this.http.get(this.baseUrl + 'bug/');
  }

  getBugById(id: number) {
    return this.http.get(this.baseUrl + 'bug/id/' + id.toString());
  }

  editBug(id: number, bug: AppBug) {
    //console.log(bug);
    return this.http.put(this.baseUrl + 'bug/id/' + id, bug);
  }

  deleteBug(pid: number, bid: number) {
    return this.http.delete(this.baseUrl + 'bug/db/' + pid + "/" + bid);
  }
  
  newBug(pid: number, bug: AppBugNew) {
    //console.log(bug);
    return this.http.put(this.baseUrl + 'bug/nb/' + pid, bug);
  }

}
