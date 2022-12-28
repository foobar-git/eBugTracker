import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-route-redirect',
  templateUrl: './route-redirect.component.html',
  styleUrls: ['./route-redirect.component.css']
})
export class RouteRedirectComponent implements OnInit {
  baseUrl = environment.apiUrl;
  url: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.url = params.get('url');
    });

    this.redirect(this.url);
  }

  redirect(url: string) {
    //console.log(url);
    this.http.get(this.baseUrl + url);
  }

}