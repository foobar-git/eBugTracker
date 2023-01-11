import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugInfoComponent } from './bugs/bug-info/bug-info.component';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ProjectInfoNameComponent } from './projects/project-info-name/project-info-name.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
//import { MessagesComponent } from './users/messages/messages.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { CommentComponent } from './comments/comment/comment.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'search', component: SearchComponent },  // route '...:4200/search/'

      { path: 'users', component: UserListComponent},  // route '...:4200/users/'
      { path: 'user/id/:id', component: UserProfileComponent },  // route '...:4200/user/id/"id"'
      { path: 'user/edit/this', component: UserEditComponent },  // route '...:4200/user/edit/this'

      { path: 'projects', component: ProjectListComponent },  // route '...:4200/projects/'
      { path: 'project/:name', component: ProjectInfoNameComponent },  // route '...:4200/project/"projectname"'
      { path: 'project/id/:id', component: ProjectInfoComponent },  // route '...:4200/project/id/"id"/'

      { path: 'bugs', component: BugListComponent },  // route '...:4200/bugs/'
      //{ path: 'bug/:name', component: BugInfoNameComponent },  // route '...:4200/bug/"bugname"'
      { path: 'bug/id/:id', component: BugInfoComponent },  // route '...:4200/bug//id/"id"/'

      //{ path: 'comments', component: CommentListComponent },  // route '...:4200/comments/'
      { path: 'comment/id/:id', component: CommentComponent },  // route '...:4200/comment/id/"id"/'
      
      { path: 'fileupload/:pid/:bid', component: FileUploadComponent },  // route '...:4200/fileupload/"pid"/"bid"/'

      //{ path: 'messages', component: MessagesComponent },  // route '...:4200/messages/'
      
      //{ path: '/:url', component: RouteRedirectComponent },  // route '...:4200/"url"/'
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },  // route '...:4200/...' (a catch-all route)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
