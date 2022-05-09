import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
import { log } from 'console';

declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-new-interface',
  templateUrl: './new-interface.component.html',
  styleUrls: ['./new-interface.component.css']
})
export class NewInterfaceComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  username:new FormControl("",Validators.compose([Validators.required])),
  password:new FormControl("",Validators.compose([Validators.required])),
  email:new FormControl("",Validators.compose([Validators.required])),
  enterpriseShortName:new FormControl("",Validators.compose([Validators.required])),
  clientId:new FormControl("",Validators.compose([Validators.required])),
  lockRef:new FormControl("",Validators.compose([Validators.required])),
  ApiSchedule:new FormControl("",Validators.compose([Validators.required])),
  ApiScheduleStatue:new FormControl("",Validators.compose([Validators.required])),
})
authData:any;
dis:any;
x:any;



constructor(public apiService:APIsService) { 
}

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white '
  });

  }
  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");


      
    }
    else if(this.dis=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
      $('.apiEveryDay').val("hh:mm");
    }
    else if(this.dis=="apiyear"){
      $(".apiEveryYear").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.apiEveryDay').val("hh:mm");


    }
  }

authorization()
{
  let tok =  localStorage.getItem('token');
  var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
  var originalText = bytes.toString(cryptoJS.enc.Utf8);
  let x=JSON.parse(originalText)
  
  if(x[0].LockRef == this.form2.get("lockRef")?.value && x[0].EnterpriseShortName == this.form2.get("enterpriseShortName")?.value){

   
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('authorization',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.authData=""
  for (let i = 0; i < data.length; i++) {
    this.authData+=data[i]+" "
  }
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  })
}else{
  $('#liveToast').toast('show')
  $('.toast-body').html("License and configuration doesn't match")

}
}


}
