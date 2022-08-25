import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugInfoComponent } from './bugs/bug-info/bug-info.component';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats/stats.component';
import { MessagesComponent } from './users/messages/messages.component';
import { UserListComponent } from './users/user-list/user-list.component';
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
      { path: 'users/:id', component: UserProfileComponent },  // route '...:4200/users/n/'
      { path: 'bugs', component: BugListComponent },  // route '...:4200/bugs/'
      { path: 'bugs/:id', component: BugInfoComponent },  // route '...:4200/bugs/n/'
      { path: 'messages', component: MessagesComponent },  // route '...:4200/messages/'
    ]
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },  // route '...:4200/...' (a catch-all route, still has to match)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
