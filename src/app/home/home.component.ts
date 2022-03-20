import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public httpClient:HttpClient) { 

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
    await this.httpClient.get<any>('http://localhost:5000/License').subscribe(
      response => {
        this.getLicense= response;//response variable holds all the data retrived then asign them to a variable cold data

    
      }
    )
  } 
}
