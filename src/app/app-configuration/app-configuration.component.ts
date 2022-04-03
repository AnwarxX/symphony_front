import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';

declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-app-configuration',
  templateUrl: './app-configuration.component.html',
  styleUrls: ['./app-configuration.component.css']
})
export class AppConfigurationComponent implements OnInit {
//this is the form group that contains all the property setting inputs with its validation
form = new FormGroup({
})
value:any;
data:any;
proud:any;
LockRef :any;
Enterprise:any;

  constructor(public apiService:APIsService) { 
    this.getLicense()

  }


 
  async  getLicense()
  {let tok =  localStorage.getItem('token');
   
  
    var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
    var originalText = bytes.toString(cryptoJS.enc.Utf8);
    this.data=JSON.parse(originalText)
    this.value =new Date(this.data[0].EndDate.split("GMT"))
    console.log(this.value);
    
    this.proud =this.data[0].product
    this.LockRef =this.data[0].LockRef 
    this.Enterprise =this.data[0].EnterpriseShortName
    
    
    

   
    
  }
 
  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });

  }

}
              