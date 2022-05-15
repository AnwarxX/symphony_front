import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
import { log } from 'console';

declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-new-interface',
  templateUrl: './sun-interface.component.html',
  styleUrls: ['./sun-interface.component.css']
})
export class SunInterfaceComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  SunUser:new FormControl("",Validators.compose([Validators.required])),
  name:new FormControl("",Validators.compose([Validators.required])),
  SunPassword:new FormControl("",Validators.compose([Validators.required])),
  Sunserver:new FormControl("",Validators.compose([Validators.required])),
  SunDatabase:new FormControl("",Validators.compose([Validators.required])),
  SunSchedule:new FormControl("",Validators.compose([Validators.required])),
  SunScheduleStatue:new FormControl("",Validators.compose([Validators.required])),
  type:new FormControl("",Validators.compose([Validators.required]))
})
authData:any;
dis:any;
x:any;
mapp:any;
interfaces:any;
input:any;
types:any;


constructor(public apiService:APIsService) { 
  this.imports('api')
}

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white '
  });

  }
  
   diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".sunEveryDay").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $('.sunEveryMonth').val("yyyy-MM-ddThh:mm");
      
    }
    else if(this.dis=="month"){
      $(".sunEveryMonth").removeAttr('disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $('.sunEveryDay').val("hh:mm");
    }
  
  }
  type(event: any)
  {
    this.input=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    this.imports(this.input)
  }
authorization()
{
  let tok =  localStorage.getItem('token');
  var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
  var originalText = bytes.toString(cryptoJS.enc.Utf8);
  let x=JSON.parse(originalText)
   
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('sunAuthorization',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  $('#liveToast').toast('show')
  $('.toast-body').html(data)
  })
}
imports(typ:any){
  this.interfaces=[]
  if (typ=="caps"){
    this.apiService.getFun('capsCodes').subscribe(data => {
      for (let i = 0; i < data.interface.length; i++) {
        this.interfaces.push(data.interface[i].capsCode)
      }
    })
  }
  else{
    this.apiService.getFun('sunCodes').subscribe(data => {
      for (let i = 0; i < data.interface.length; i++) {
        this.interfaces.push(data.interface[i].interfaceCode)
      }
    })
  }
}


}
