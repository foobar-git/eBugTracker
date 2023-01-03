import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppBug } from 'src/app/_models/appBug';
import { BugImageIndex } from 'src/app/_models/bugImageIndex';
import { BugsService } from 'src/app/_services/bugs.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { HelperFnService } from 'src/app/_services/helper-fn.service';

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.css']
})
export class BugEditComponent implements OnInit {
  saving: boolean = false;
  @Input() bug: AppBug;
  bugEdited: boolean = false;
  //bugImages: string[] = [];
  biIndex = BugImageIndex;

  constructor(private bugsService: BugsService, private helperFn: HelperFnService,
    private toastr: ToastrService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    //console.log(this.bug);
    // v26
    //this.bugImages.push(this.bug.bugImage1, this.bug.bugImage2, this.bug.bugImage3, this.bug.bugImage4, this.bug.bugImage5);
  }

  updateBug(id: number, skipReload: boolean) {
    //console.log("Updating bug...");
    //console.log(this.bug);
    this.setSaving(true);
    this.bug.edited = true;
    this.bug.dateCreated = this.helperFn.getCurrentDateTime();
    this.bugsService.editBug(id, this.bug).subscribe(() => {
      this.toastr.success("Bug edited, changes saved.").onHidden.subscribe(() => {
          if (!skipReload) window.location.reload();
          else this.setSaving(false); // re-enable the saving button
        }
      );
    });
  }

  removeBug() {
    if (window.confirm("Delete this bug?")) {
      if (this.bug.id != null) {
        //console.log(this.bug.id);
        this.bugsService.deleteBug(this.bug.projectId, this.bug.id).subscribe(() => {
          this.toastr.success("Bug entry removed.").onHidden.subscribe(
            () => window.location.reload()
          );
        });
      }
    }
  }

  removeImage(imageNumber : number) {
    let n = this.biIndex[imageNumber];
    //console.log(this.bug[n]);
    if (this.bug[n] != "") {
      if (window.confirm("Delete this image?")) {
        this.fileUploadService.delete(this.bug.projectId, this.bug.id, this.bug[n]).subscribe(() => {
          this.bug[n] = "";
          console.log(this.bug[n]);
          this.toastr.success("File deleted.")
          this.updateBug(this.bug.id, true);
        });
      }
    }
  }

  setSaving(b: boolean) {
    this.saving = b;
  }

}
