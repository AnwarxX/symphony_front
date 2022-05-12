import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { log } from 'console';
import { APIsService } from "../services/apis.service";
declare var $:any

@Component({
  selector: 'app-sun-details',
  templateUrl: './sun-details.component.html',
  styleUrls: ['./sun-details.component.css']
})
export class SunDetailsComponent implements OnInit {
  form2 = new FormGroup({
    sunCode:new FormControl("",Validators.compose([Validators.required])),
    user:new FormControl("",Validators.compose([Validators.required])),
    password:new FormControl("",Validators.compose([Validators.required])),
    server:new FormControl("",Validators.compose([Validators.required])),
    database:new FormControl("",Validators.compose([Validators.required])),
    type:new FormControl("",Validators.compose([Validators.required])),
    sunScheduleStatus:new FormControl("",Validators.compose([Validators.required])),
    sunSchedule:new FormControl("",Validators.compose([Validators.required])),
  })

 sun:any;
 rowInput:any;
  dis:any;

  sunDate:any;
  reviewInput:any;
  all=true;


  constructor(public apiService:APIsService) { 
    this.getSun();
  }

  

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }
  async getSun(){
        //send a get request to the backend to retrive all the mapping data from the database
    await this.apiService.getFun('getSun').subscribe(
      response => {
        this.sun = response;//response variable holds all the data retrived then asign them to a variable cold data
         for (let i = 0; i < this.sun.length; i++) {
          this.sun[i].SunSchedule=this.dissEdit2(this.sun[i].SunSchedule,this.sun[i].SunScheduleStatue)
         }
         console.log(this.sun,"dddd");
      }
    )
  } 
  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".CapsEveryDays").removeAttr('disabled');
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");
    }
    else if(this.dis=="month"){
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $('.CapsEveryDays').val("hh:mm");
    }
      if (this.dis=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");
      
    }
    else if(this.dis=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $('.apiEveryDay').val("hh:mm");
    }
  
  }
  dissEdit(){
    let sunDate = this.reviewInput.SunSchedule
    
    if (this.reviewInput.SunScheduleStatue=="day") {
      this.form2.patchValue({sunSchedule:sunDate})
      $(".CapsEveryDays").removeAttr('disabled');
      $(".CapsEveryDays").val(sunDate);
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $("#exampleRadios1").prop('checked',true);
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      console.log(this.form2.value);
    }
    else if(this.reviewInput.SunScheduleStatue=="month"){
      this.form2.patchValue({sunSchedule:sunDate})
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryMonth").val(sunDate);
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $("#exampleRadios2").prop('checked',true);
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryDays').val("hh:mm");
    }
  }
   dissEdit2(date:any,status:any){
    this.sunDate =date.split(" ")
    if (status=="day"){
      return this.sunDate[2] + ":" +this.sunDate[1]
    }
    else {
      return new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.sunDate[3] < 10) ? "0" :'')+this.sunDate[3] + "T" +  
      this.sunDate[2] + ":"+this.sunDate[1]
    }
  }
  
deleteBtn(row:any){
  this.rowInput=row;
  
}
editBtn(row:any){
  this.reviewInput=row;
  console.log(this.reviewInput);
  this.form2.setValue({
    sunCode:this.reviewInput.SunCode,
    user:this.reviewInput.SunUser,
    password:this.reviewInput.SunPassword,
    server:this.reviewInput.Sunserver,
    database:this.reviewInput.SunDatabase,
    type:this.reviewInput.type,
    sunScheduleStatus:this.reviewInput.SunScheduleStatue,
    sunSchedule:this.reviewInput.SunSchedule,
  })
  
    this.dissEdit()
    
  // })
}
update()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  console.log(this.form2.value);
  this.apiService.postFun('updateSun',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.getSun()
  $('#liveToast').toast('show')
  $('.toast-body').html(data)
  })

}
confirmDelete(){
  console.log(this.rowInput);
  
  this.apiService.postFun('deleteSun',this.rowInput).subscribe(data => {
    this.getSun()
  })
}


}
