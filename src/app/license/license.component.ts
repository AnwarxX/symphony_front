import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
import { Router } from '@angular/router';

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
              var bytes  = cryptoJS.AES.decrypt(data.token, 'lamiaa');
              var originalText = bytes.toString(cryptoJS.enc.Utf8);
              localStorage.setItem('token',data.token);
              this.router.navigate(['/home']);
          }
          
          })
      }
  }
  constructor(public router:Router,public apiService:APIsService) { 
    this.getLicense()
  }
  tok:any
 async  getLicense(){
    //send a get request to the backend to retrive all the data in this endpoit
     await this.apiService.getFun('getLisence').subscribe(
      response => {
        this.tok = response;//response variable holds all the data retrived then asign them to a variable cold data
        //loop that iterates over the objects in the data and returns only the table name then push it in an array called tableNames
        if(this.tok == null || this.tok=="" || this.tok == "please uplode license"){
          
          localStorage.setItem('token',"");
          $('#liveToast').toast('show')
          $('.toast-body').html("Please Uplode License")
        }
        else{
          localStorage.setItem('token',this.tok);
          this.router.navigate(['/home']);

        }
      }
    )
  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
    
 
  }

  

}
