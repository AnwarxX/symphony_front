import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  SERVER_URL: string = "{Server URL}";
  
  public upload(formData:any) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


  constructor(private httpClient: HttpClient) {

    
   }
}
