import { Component, Input, OnInit } from '@angular/core';
import { AppProject } from 'src/app/_models/appProject';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  saving: boolean = false;
  @Input() project: AppProject;
  projectEdited: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  setSaving(b: boolean) {
    this.saving = b;
  }

}
