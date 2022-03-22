import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';



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
        this.apiService.postFun('uploadLicense',{license:this.text}).subscribe(data => {
          this.data=data; //data variable holds all the data retrived then asign them to a variable cold value
          $('#liveToast').toast('show')
          $('.toast-body').html(data.massage)
          if(data.massage =="License Submited"){  
              console.log(data.token);
              var bytes  = cryptoJS.AES.decrypt(data.token, 'lamiaa');
              var originalText = bytes.toString(cryptoJS.enc.Utf8);
              console.log(originalText);
              localStorage.setItem('token',data.token)
    
      
          }
          
          })
      }
  }
  constructor(public apiService:APIsService) { 
  
  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  let tok =  localStorage.getItem('token');
    if(tok == null || tok==""){
      $('#liveToast').toast('show')
      $('.toast-body').html("Please Uplode License")
    }
 
  }

  

}
