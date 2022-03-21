import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public apiService:APIsService) { 

  }


  onFileSelected($event:any){
  
    console.log($event);
    

  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });

  
  }

  async getLicense(){
    
    //send a get request to the backend to retrive all the mapping data from the database
    await this.apiService.getFun('License').subscribe(
      response => {
        this.getLicense= response;//response variable holds all the data retrived then asign them to a variable cold data

    
      }
    )
  } 
}
