import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppProject } from '../_models/appProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAppProject(projectname: string) {
    return this.http.get<AppProject[]>(this.baseUrl + 'project/' + projectname);
  }

  getAppProjects() {
    return this.http.get<AppProject[]>(this.baseUrl + 'project');
  }
}
