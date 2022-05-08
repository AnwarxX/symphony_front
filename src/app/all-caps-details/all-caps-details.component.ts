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
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }
  async getCAPS(){
    
    //send a get request to the backend to retrive all the mapping data from the database
    await this.apiService.getFun('getCAPS').subscribe(
      response => {
        this.CAPS = response;//response variable holds all the data retrived then asign them to a variable cold data
         for (let i = 0; i < this.CAPS.length; i++) {
          this.CAPS[i].capsSchedule=this.dissEdit(this.CAPS[i].capsSchedule,this.CAPS[i].capsScheduleStatus)
         }
         console.log(this.CAPS);
      }
    )
  } 
  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".CapsEveryDay").removeAttr('disabled');
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
    }
    else if(this.dis=="month"){
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDay").attr('disabled', 'disabled');
    }
    else if(this.dis=="year"){
      $(".CapsEveryYear").removeAttr('disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDay").attr('disabled', 'disabled');
    }
   
  }
  dissEdit(date:any,status:any){
    this.capsDate =date.split(" ")
    if (status=="day"){
      return this.capsDate[2] + ":" + 
      ((this.capsDate[1] < 10) ? "0" :'')+this.capsDate[1]
    }
    else if(status=="month"){
      return new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.capsDate[3] < 10) ? "0" :'')+this.capsDate[3] + "T" +  
      this.capsDate[2] + ":" + 
      ((this.capsDate[1] < 10) ? "0" :'')+this.capsDate[1]
    }
    else{
      return new Date().getFullYear() + "-" +  
      ((this.capsDate[4] < 10) ? "0" :'')+this.capsDate[4] + "-" + 
      ((this.capsDate[3] < 10) ? "0" :'')+this.capsDate[3] + "T" +  
      this.capsDate[2] + ":" + 
      ((this.capsDate[1] < 10) ? "0" :'')+this.capsDate[1]
    }
    
  }
  
deleteBtn(row:any){
  this.rowInput=row;
  
}
editBtn(row:any){
  this.reviewInput=row;
  this.form2.setValue({
    capsCode:this.reviewInput.capsCode,
    user:this.reviewInput.user,
    password:this.reviewInput.password,
    server:this.reviewInput.server,
    database:this.reviewInput.database,
    locRef:this.reviewInput.locRef,
    capsScheduleStatus:this.reviewInput.database,
    capsSchedule:this.reviewInput.locRef,
  })
  // this.apiService.postFun('reviewInterface',this.reviewInput).subscribe(data => {
  //   delete data.refreshToken;
  //   delete data.token;

  //   this.form2.setValue(data);
  //   this.reviewInput=data;
  //   this.dissEdit()
    
  // })
  console.log(this.reviewInput);
}
update()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('update',this.form2.value).subscribe(data => {
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
