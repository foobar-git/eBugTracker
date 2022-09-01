import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error_response => {
        if (error_response) {
          switch (error_response.status) {
            case 400:     // the idea is to flatten the returned nested error into one array
              if (error_response.error.errors) {
                const modalStateErrors = [];  // validation errors are known as modal state errors
                // loop over each key in the errors_response object
                for (const element in error_response.error.errors) {
                  if (error_response.error.errors[element]) {
                    modalStateErrors.push(error_response.error.errors[element])
                  }
                }
                throw modalStateErrors;
              } else {    // if it's a normal toastr (flat 400)
                this.toastr.error(error_response.statusText, error_response.status);
              }
              break;
            case 401:

              break;
            default:
              break;
          }
        }
        return throwError(error_response);
      })
    );
  }
}
