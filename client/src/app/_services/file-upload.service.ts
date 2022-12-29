import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
  export class FileUploadService {
  baseUrl = environment.apiUrl;
    
  constructor(private http:HttpClient) { }

  upload(file: any): Observable<any> {
    if (file != null) {
      // Create form data
      const formData = new FormData();
        
      // Store form name as "files" with file data
      formData.append("files", file, file.name);
        
      // Make http post request over api with formData as request
      return this.http.put(this.baseUrl + "fileupload/", formData);
    }    
  }

  delete(filename: string) {
    //console.log(filename);
    return this.http.delete(this.baseUrl + "fileupload/df/" + filename);
  }

}
