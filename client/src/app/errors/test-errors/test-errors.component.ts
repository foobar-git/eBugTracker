import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get_400_Error() {
    this.http.get(this.baseUrl + 'error/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_400_ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);//,
      //complete: () => void;

      // prepare array for displaying in the html template
      for (let i = 1; i < error.length; i++) {
        this.validationErrors.push(error[i])
      }
    })
  }

  get_401_Error() {   // this error is working properly if the user is not logged in
    this.http.get(this.baseUrl + 'error/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_404_Error() {
    this.http.get(this.baseUrl + 'error/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_500_Error() {
    this.http.get(this.baseUrl + 'error/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

}
//