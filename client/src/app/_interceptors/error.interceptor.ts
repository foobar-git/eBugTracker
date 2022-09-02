import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private statusText_string: string;
  private modalStateErrors: any[];

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error_response => {
        if (error_response) {
          error_response = this.switchErrors(error_response);
          this.modalStateErrors = [];
          if (this.modalStateErrors.length !== 0) throw this.modalStateErrors;
        }
        return throwError(error_response);  // always return an error
      })
    );
  }

  // helper function
  switchErrors(error_r) {
    switch (error_r.status) {
      case 400:   // Bad request - validation error
        if (error_r.error.errors) {
          this.statusText_string = "Bad request: validation error";
          //this.toastr.error(error_r.statusText = this.statusText_string, error_r.status);

          //const modalStateErrors = [];  // validation errors are known as modal state errors
          // the idea is to flatten the returned nested response into one array
          for (const element in error_r.error.errors) { // loop over each key in the errors_response object
            if (error_r.error.errors[element]) {
              this.modalStateErrors.push(error_r.error.errors[element])
            }
          }
          //throw modalStateErrors; // throwing modelStateErrors back to the component
          
        } else {    // 400: Bad request (with flat response)
            //this.toastr.error(error_response.statusText, error_response.status);
            this.statusText_string = error_r.error;//"Bad request"
        }
        break;

      case 401:   // Unauthorized
        //this.toastr.error(error_response.statusText, error_response.status)
        this.statusText_string = "Unauthorized";
        break;

      case 404:
        this.statusText_string = "Not found";
        this.router.navigateByUrl('/not-found');
        break;

      case 500:
        this.statusText_string = "Server error";
        const navigationExtras: NavigationExtras = { state: {error: error_r.error} };
        this.router.navigateByUrl("/server-error", navigationExtras);
        break;

      default:
        this.toastr.error("Undefined error");
        break;
    }
    this.toastr.error(error_r.statusText = this.statusText_string, error_r.status);
    return error_r; // update "error_response"
  }
}
