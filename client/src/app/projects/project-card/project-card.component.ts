import { Component, Input, OnInit } from '@angular/core';
import { AppProject } from 'src/app/_models/appProject';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: AppProject;
  editProject: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
