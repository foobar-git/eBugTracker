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

  getProject(projectname: string) {
    return this.http.get<AppProject[]>(this.baseUrl + 'project/' + projectname);
  }

  getProjects() {
    return this.http.get<AppProject[]>(this.baseUrl + 'project');
  }

  editProject(id: number, project: AppProject) {
    //console.log(project);
    return this.http.put(this.baseUrl + 'project/id/' + id, project);
  }

  deleteProject(id: number) {
    return this.http.delete(this.baseUrl + 'project/dp/' + id);
  }
  
  newProject(id: number, project: AppProject) {
    //console.log(project);
    return this.http.put(this.baseUrl + 'project/np/' + id, project);
  }

}
