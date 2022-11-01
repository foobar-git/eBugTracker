import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
//import { MessagesComponent } from './users/messages/messages.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { BugInfoComponent } from './bugs/bug-info/bug-info.component';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';
import { ProjectInfoNameComponent } from './projects/project-info-name/project-info-name.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { CommentComponent } from './comment/comment.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditAdminComponent } from './users/user-edit-admin/user-edit-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    //MessagesComponent,
    UserListComponent,
    UserProfileComponent,
    BugInfoComponent,
    BugListComponent,
    StatsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProjectListComponent,
    ProjectInfoComponent,
    ProjectInfoNameComponent,
    UserCardComponent,
    ProjectCardComponent,
    CommentComponent,
    UserEditComponent,
    UserEditAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }     // interceptor for sending tokens
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
