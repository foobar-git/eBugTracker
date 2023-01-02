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

  upload(pid: number, bid: number, file: any): Observable<any> {
    if (file != null) {
      // Create form data
      const formData = new FormData();
        
      // Store form name as "files" with file data
      formData.append("files", file, file.name);
        
      // Make http post request over api with formData as request
      let location: string = "fileupload/" + pid + "/" + bid;
      return this.http.put(this.baseUrl + location, formData);
    }    
  }

  delete(pid: number, bid: number, filename: string) {
    //console.log(filename);
    let location: string = "fileupload/df/" + pid + "/" + bid + "/";
    return this.http.delete(this.baseUrl + location + filename);
  }

}
