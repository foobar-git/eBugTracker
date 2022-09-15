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
import { StatsComponent } from './stats/stats.component';
import { MessagesComponent } from './users/messages/messages.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileUsernameComponent } from './users/user-profile-username/user-profile-username.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthGuard } from './_guards/auth.guard';

/* v5
const routes: Routes = [
  {path: '', component: HomeComponent},  // route '...:4200/'
  {path: 'stats', component: StatsComponent},  // route '...:4200/stats/'
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},  // route '...:4200/users/'
  {path: 'users/:id', component: UserProfileComponent},  // route '...:4200/users/n/'
  {path: 'bugs', component: BugListComponent},  // route '...:4200/bugs/'
  {path: 'bugs/:id', component: BugInfoComponent},  // route '...:4200/bugs/n/'
  {path: 'messages', component: MessagesComponent},  // route '...:4200/messages/'
  {path: '**', component: HomeComponent, pathMatch: 'full'},  // route '...:4200/...' (a catch-all route, still has to match)
];*/

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'stats', component: StatsComponent },  // route '...:4200/stats/'

      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },  // route '...:4200/users/'
      { path: 'users/:username', component: UserProfileUsernameComponent },  // route '...:4200/users/"username"'
      { path: 'users/id/:id', component: UserProfileComponent },  // route '...:4200/users/"id"'

      { path: 'project', component: ProjectListComponent },  // route '...:4200/projects/'
      { path: 'project/:name', component: ProjectInfoNameComponent },  // route '...:4200/projects/"projectname"'
      { path: 'project/id/:id', component: ProjectInfoComponent },  // route '...:4200/projects/"id"/'

      { path: 'bugs', component: BugListComponent },  // route '...:4200/bugs/'
      { path: 'bugs/id/:id', component: BugInfoComponent },  // route '...:4200/bugs/"id"/'
      { path: 'messages', component: MessagesComponent },  // route '...:4200/messages/'
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },  // route '...:4200/...' (a catch-all route, still has to match)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
