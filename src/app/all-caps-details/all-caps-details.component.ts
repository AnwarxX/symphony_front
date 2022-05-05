import { Component, OnInit } from '@angular/core';
import { APIsService } from "../services/apis.service";
declare var $:any
@Component({
  selector: 'app-all-caps-details',
  templateUrl: './all-caps-details.component.html',
  styleUrls: ['./all-caps-details.component.css']
})
export class AllCAPSDetailsComponent implements OnInit {
  CAPS:any;
  capsDate:any;
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
}
