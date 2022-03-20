import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
declare var $:any //declear $ to use jquery
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  text:any;
  file:any;
  data:any;
  form = new FormGroup({
    inputFile:new FormControl("",Validators.compose([Validators.required]))
  })
  fileChanged(event:any) {
      this.file = event.target[0].files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = (e) => {
        this.text=fileReader.result;    
       this.httpClient.post<any>('http://localhost:5000/uploadLicense',{license:this.text}).subscribe(data => {
          this.data=data; //data variable holds all the data retrived then asign them to a variable cold value
          $('#liveToast').toast('show')
          $('.toast-body').html(this.data)
          
          })
      }
  }
  constructor(public httpClient:HttpClient) { 

  
  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }

  

}
