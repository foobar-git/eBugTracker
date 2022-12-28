import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BugEditComponent } from '../bugs/bug-edit/bug-edit.component';
import { BugsService } from '../_services/bugs.service';
import { FileUploadService } from '../_services/file-upload.service';
import { HelperFnService } from '../_services/helper-fn.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  maxFileSize: number = 5242880; // 5 MB
  maxFileSizeInfo: string = this.maxFileSize.toString().charAt(0);
	requiredFileTypes: string[] = [ "image/avif", "image/jpg", "image/jpeg", "image/png", "image/tiff" ];
	file: File = null;                // Variable to store file
  @Input() numberString: string;
  bugImageNumber: number;
  _bugEdit: any;
  _toastr: any;

	constructor(private fileUploadService: FileUploadService, private toastr: ToastrService,
    private bugEdit: BugEditComponent, private bugsService: BugsService, private helperFn: HelperFnService) { }

	ngOnInit(): void {
    this._bugEdit = this.bugEdit;
    this._toastr = this.toastr;
    this.bugImageNumber = parseInt(this.numberString, 10);
    //console.log(this.bugEdit.bug);
    //console.log(Object.values(this.bugEdit.bug)[5]);
	}

	// On file Select
	onChange(event) {
		this.file = event.target.files[0];
	}

	// OnClick of button Upload
	onUpload(toastrServ: any, bugEditComp: any, imageNumber: number) {
    let file = this.file;
    if (this.file != null) {
		  console.log(this.file);
      if (this.helperFn.validateFileType(this.requiredFileTypes, this.file)) {
        if (this.file.size <= this.maxFileSize) {
          this.fileUploadService.upload(this.file).subscribe({
            next() {
              //console.log("Running 'next'.");
              enum biIndex {
                "bugImage1" = 1,
                "bugImage2" = 2,
                "bugImage3" = 3,
                "bugImage4" = 4,
                "bugImage5" = 5
              };
              let i = biIndex[imageNumber];
              console.log(i);   //console.log(Object.values(bugEditComp.bug)[imageNumber]);
              console.log(file.name);
              bugEditComp.bug[i] = file.name;
              console.log(bugEditComp.bug);
            },
            error (error) {
              console.log("Running 'error'.");
              toastrServ.error("File was not uploaded.", null, {timeOut: 10000});
            },
            complete() {
              //console.log("Running 'complete'.");
              toastrServ.success("File uploaded.").onHidden.subscribe(
                () => bugEditComp.updateBug(bugEditComp.bug.id)
              );
            }
          });
        }
        else {
          toastrServ.error("File size limit: " + this.maxFileSizeInfo + " MB");
        }
      }
      else {
        toastrServ.error("File type not allowed.");
      }
    }
    else {
      toastrServ.error("No file selected");
    }   
	}

}
