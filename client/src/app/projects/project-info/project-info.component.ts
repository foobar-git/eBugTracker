import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UsersAssigned } from 'src/app/_models/usersAssigned';
import { BugsAssigned } from 'src/app/_models/bugsAssigned';
import { Observable, of } from 'rxjs';
import { HelperFnService } from 'src/app/_services/helper-fn.service';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  project: any;
  id: number;
  usersAssigned: UsersAssigned[];
  bugsAssigned: BugsAssigned[];
  bugsAssignedNumber: number;                 // number of bugs - when listing bugs in cards
  bugIdIndex: number = 0;                     // bug index - position in array when loading bugs by id
  noBugsAssigned$: Observable<any>;
  numberOfBugs: number;
  numberOfUsers: number;
  dateTimeCreated: string;
  dateTimeCompleted: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private helperFn: HelperFnService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //this.id = +params.get('id');
      this.id = parseInt(params.get('id'));
      //console.log(this.id);
    });
    this.getProjectId(this.id);
  }

  getProjectId(id: number) {
    this.http.get('https://localhost:5001/api/project/id/' + id.toString()).subscribe({ // observables do nothing until subscribed
      next: response => this.project = response,
      error: error => console.log(error),
      complete: () => {
        //console.log(this.project.usersAssigned);                          // can be used for returning a list of user names
        //this.usersAssigned = JSON.stringify(this.project.usersAssigned);  // can be used for returning a list of user names
        this.usersAssigned = this.project.usersAssigned;
        this.dateTimeCreated = this.helperFn.formatDateTime(this.project.dateCreated);
        this.dateTimeCompleted = this.helperFn.formatDateTime(this.project.dateCompleted);
        
        this.bugsAssigned = this.project.bugsAssigned;
        //this.bugsAssigned = this.bugsAssigned.reverse();
        this.bugIdIndex = this.bugsAssigned.length - 1;                     // getting the last index first
        
        var length = this.bugsAssigned.length;
        if (length > 0) this.bugsAssignedNumber = length - 1;
        else {
          this.bugsAssignedNumber = 0;
        }
        this.noBugsAssigned$ = this.checkForbugsAssignedAsync();            // delay the check if there are any comments posted
        
        //console.log(this.usersAssigned.length);                           // can be used for returning a list of users in project
        this.numberOfUsers = this.usersAssigned.length;
        //console.log(this.bugsAssigned.length);                            // can be used for returning a list of bugs in project
        this.numberOfBugs = this.bugsAssigned.length;
      }
    })
  }

  checkForbugsAssignedAsync() {
    return of(this.bugsAssignedNumber);
  }

  updateBugsNumber() {
    if(this.bugsAssignedNumber > 0) this.bugsAssignedNumber--;
  }

  updateBugIdIndex() {
    this.bugIdIndex--;                                    // when accessing array by index, start from last element and count down
  }

}
