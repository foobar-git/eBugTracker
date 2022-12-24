import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppBug } from 'src/app/_models/appBug';
import { BugsService } from 'src/app/_services/bugs.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.css']
})
export class BugEditComponent implements OnInit {
  @Input() bug: AppBug;
  bugEdited: boolean = false;
  bugImages: string[] = [];

  constructor(private bugsService: BugsService, private helperFn: HelperFnService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //console.log(this.bug);
    this.bugImages.push(this.bug.bugImage1, this.bug.bugImage2, this.bug.bugImage3, this.bug.bugImage4, this.bug.bugImage5)
  }

  updateBug(id: number) {
    console.log("Update bug!");
    console.log(this.bug);
    this.bug.edited = true;
    this.bug.dateCreated = this.helperFn.getCurrentDateTime();
    this.bugsService.editBug(id, this.bug).subscribe(() => {
      this.toastr.success("Bug edited, changes saved.").onHidden.subscribe(
        //() => window.location.reload()
      );
    });
  }

  removeBug() {
    if (window.confirm("Delete this bug?")) {
      if (this.bug.id != null) {
        //console.log(this.bug.id);
        this.bugsService.deleteBug(this.bug.id).subscribe(() => {
          this.toastr.success("Bug entry removed.").onHidden.subscribe(
            () => window.location.reload()
          );
        });
      }
    }
  }

}
