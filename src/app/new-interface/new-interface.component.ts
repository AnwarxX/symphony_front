import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
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
  SunUser:new FormControl("",Validators.compose([Validators.required])),
  SunPassword:new FormControl("",Validators.compose([Validators.required])),
  Sunserver:new FormControl("",Validators.compose([Validators.required])),
  SunDatabase:new FormControl("",Validators.compose([Validators.required])),
  SunSchedule:new FormControl("",Validators.compose([Validators.required])),
  SunScheduleStatue:new FormControl("",Validators.compose([Validators.required])),
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
    console.log(this.dis);
    if (this.dis=="day") {
      $(".sunEveryDay").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
    }
    else if(this.dis=="month"){
      $(".sunEveryMonth").removeAttr('disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
    }
    else if(this.dis=="year"){
      $(".sunEveryYear").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
    }
    if (this.dis=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
    }
    else if(this.dis=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
    }
    else if(this.dis=="apiyear"){
      $(".apiEveryYear").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
    }
  }
authorization()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('authorization',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  console.log(data);
  this.authData=""
  for (let i = 0; i < data.length; i++) {
    this.authData+=data[i]+" "
  }
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  
  })
}


}
