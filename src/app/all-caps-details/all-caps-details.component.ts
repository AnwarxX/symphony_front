import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

import { APIsService } from "../services/apis.service";
declare var $:any
@Component({
  selector: 'app-all-caps-details',
  templateUrl: './all-caps-details.component.html',
  styleUrls: ['./all-caps-details.component.css']
})
export class AllCAPSDetailsComponent implements OnInit {
  form2 = new FormGroup({
    capsCode:new FormControl("",Validators.compose([Validators.required])),
    name:new FormControl("",Validators.compose([Validators.required])),
    user:new FormControl("",Validators.compose([Validators.required])),
    password:new FormControl("",Validators.compose([Validators.required])),
    server:new FormControl("",Validators.compose([Validators.required])),
    database:new FormControl("",Validators.compose([Validators.required])),
    locRef:new FormControl("",Validators.compose([Validators.required])),
    capsScheduleStatus:new FormControl("",Validators.compose([Validators.required])),
    capsSchedule:new FormControl("",Validators.compose([Validators.required])),
  })

  CAPS:any;
  rowInput:any;
  dis:any;

  capsDate:any;
  reviewInput:any;
  all=true;


  constructor(public apiService:APIsService) { 
    this.getCAPS();
  }

  

  ngOnInit(): void {
  //   $('#home').particleground({
  //     dotColor: 'cadetblue',
  //     lineColor: 'white'
  // });
  }
  async getCAPS(){
    
    //send a get request to the backend to retrive all the mapping data from the database
    await this.apiService.getFun('getCAPS').subscribe(
      response => {
        this.CAPS = response;//response variable holds all the data retrived then asign them to a variable cold data
         for (let i = 0; i < this.CAPS.length; i++) {
          this.CAPS[i].capsSchedule=this.dissEdit2(this.CAPS[i].capsSchedule,this.CAPS[i].capsScheduleStatus)
         }
         console.log(this.CAPS);
      }
    )
  } 
  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".CapsEveryDays").removeAttr('disabled');
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");

    }
    else if(this.dis=="month"){
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryDays').val("hh:mm");
    }
    else if(this.dis=="year"){
      $(".CapsEveryYear").removeAttr('disabled');
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryDays').val("hh:mm");
    }
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
  dissEdit(){
    let capsDate = this.reviewInput.capsSchedule
    
    if (this.reviewInput.capsScheduleStatus=="day") {
      this.form2.patchValue({capsSchedule:capsDate})
      $(".CapsEveryDays").removeAttr('disabled');
      $(".CapsEveryDays").val(capsDate);
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $("#exampleRadios1").prop('checked',true);
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      console.log(this.form2.value);
    }
    else if(this.reviewInput.capsScheduleStatus=="month"){
      this.form2.patchValue({capsSchedule:capsDate})
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryMonth").val(capsDate);
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $("#exampleRadios2").prop('checked',true);
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryDays').val("hh:mm");
    }
  }
  dissEdit2(date:any,status:any){
    this.capsDate =date.split(" ")
    if (status=="day"){
      return this.capsDate[2] + ":" +this.capsDate[1]
    }
    else {
      return new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.capsDate[3] < 10) ? "0" :'')+this.capsDate[3] + "T" +  
      this.capsDate[2] + ":"+this.capsDate[1]
    }
  }
  
deleteBtn(row:any){
  this.rowInput=row;
  
}
editBtn(row:any){
  this.reviewInput=row;
  this.form2.setValue({
    capsCode:this.reviewInput.capsCode,
    name:this.reviewInput.name,
    user:this.reviewInput.user,
    password:this.reviewInput.password,
    server:this.reviewInput.server,
    database:this.reviewInput.database,
    locRef:this.reviewInput.locRef,
    capsScheduleStatus:this.reviewInput.capsScheduleStatus,
    capsSchedule:this.reviewInput.locRef,
  })
  // this.apiService.postFun('reviewInterface',this.reviewInput).subscribe(data => {
  //   delete data.refreshToken;
  //   delete data.token;

  //   this.form2.setValue(data);
  //   this.reviewInput=data;
    this.dissEdit()
    
  // })
}
update()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  console.log(this.form2.value);
  this.apiService.postFun('updateCaps',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.getCAPS()
  $('#liveToast').toast('show')
  $('.toast-body').html(data)
  })
}
confirmDelete(){
  console.log(this.rowInput);
  
  this.apiService.postFun('deleteCaps',this.rowInput).subscribe(data => {
    this.getCAPS()
  })
}



}
