import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppProject } from 'src/app/_models/appProject';
import { HelperFnService } from 'src/app/_services/helper-fn.service';
import { ProjectsService } from 'src/app/_services/projects.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  saving: boolean = false;
  @Input() project: AppProject;
  projectEdited: boolean = false;

  constructor(private projectsService: ProjectsService, private helperFn: HelperFnService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  updateProject(id: number, skipReload: boolean) {
    //console.log("Updating project...");
    //console.log(this.project);
    this.setSaving(true);
    this.project.dateCreated = this.helperFn.getCurrentDateTime();
    this.projectsService.editProject(id, this.project).subscribe(() => {
      this.toastr.success("Project edited, changes saved.").onHidden.subscribe(() => {
          if (!skipReload) window.location.reload();
          else this.setSaving(false); // re-enable the saving button
      });
    });
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

}
