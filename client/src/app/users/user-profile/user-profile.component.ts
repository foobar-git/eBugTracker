import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  id: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      console.log(this.id);
    });
    this.getUser(this.id);
  }

  getUser(id: number) {
    this.http.get('https://localhost:5001/api/users/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.user = response,
      error: error => console.log(error)//,
      //complete: () => void
    })
  }
}
