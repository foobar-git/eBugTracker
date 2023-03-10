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
import { CommentComponent } from './comments/comment/comment.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import { BugCardComponent } from './bugs/bug-card/bug-card.component';
import { CommentNewComponent } from './comments/comment-new/comment-new.component';
import { BugNewComponent } from './bugs/bug-new/bug-new.component';
import { BugEditComponent } from './bugs/bug-edit/bug-edit.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { RouteRedirectComponent } from './route-redirect/route-redirect.component';
import { ProjectNewComponent } from './projects/project-new/project-new.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { SearchComponent } from './search/search.component';

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
    BugCardComponent,
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
    CommentEditComponent,
    CommentNewComponent,
    BugNewComponent,
    BugEditComponent,
    FileUploadComponent,
    RouteRedirectComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    SearchComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },    // interceptor for sending tokens
    { provide: ProjectInfoComponent },                                        // make available to other components
    { provide: ProjectNewComponent },                                         // make available to other components
    { provide: BugInfoComponent },                                            // make available to other components
    { provide: BugNewComponent },                                             // make available to other components
    { provide: BugEditComponent },                                            // make available to other components
    { provide: CommentNewComponent }                                          // make available to other components
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
