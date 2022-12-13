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

  constructor(private bugsService: BugsService, private helperFn: HelperFnService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  updateBug(id: number) {
    console.log("Update bug!");
    console.log(this.bug);
    //this.comment.edited = true;
    this.bug.dateCreated = this.helperFn.getCurrentDateTime();
    this.bugsService.editBug(id, this.bug).subscribe(() => {
      this.toastr.success("Comment edited, changes saved.").onHidden.subscribe(
        () => window.location.reload()
      );
    });
  }

  removeBug() {
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
