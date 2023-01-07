import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppProject } from '../_models/appProject';
import { UsersAssignedNew } from '../_models/usersAssignedNew';

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
  
  newProject(project: AppProject) {
    //console.log(project);
    return this.http.put(this.baseUrl + 'project/np/', project);
  }

  newUsersAssigned(usersAssignedNew: UsersAssignedNew) {
    //console.log(usersAssignedNew);
    return this.http.put(this.baseUrl + 'usersassigned/nua/', usersAssignedNew);
  }

  removeUserFromProject(pid: number, uid: number) {
    return this.http.delete(this.baseUrl + 'usersassigned/dua/' + pid + "/" + uid);
  }

}
