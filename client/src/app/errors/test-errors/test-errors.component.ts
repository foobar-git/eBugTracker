import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get_400Error() {
    this.http.get(this.baseUrl + 'error/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);//,
      //complete: () => void;
    })
  }

  get_401Error() {
    this.http.get(this.baseUrl + 'error/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_404Error() {
    this.http.get(this.baseUrl + 'error/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

  get_500Error() {
    this.http.get(this.baseUrl + 'error/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)//,
      //complete: () => void;
    })
  }

}
