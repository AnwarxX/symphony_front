import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-all-interfaces-details',
  templateUrl: './all-interfaces-details.component.html',
  styleUrls: ['./all-interfaces-details.component.css']
})
export class AllInterfacesDetailsComponent implements OnInit {
  reply:any;
  constructor(public httpClient:HttpClient) { 
    
  
  }

    ngOnInit(): void {
      $('#home').particleground({
        dotColor: 'cadetblue',
        lineColor: 'white '
    });
    $(function() {
      $('input[name="daterange"]').daterangepicker({
        opens: 'left'
      }, function(start:any, end:any, label:any) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      });
    });
    
  }
  start(){
    this.httpClient.get<any>('http://localhost:5000/start').subscribe(data => {
    this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
    //this.getmapp()//then call this function again to render the new submitted data
    })
  }
  stop(){
    this.httpClient.get<any>('http://localhost:5000/stop').subscribe(data => {
    this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
    //this.getmapp()//then call this function again to render the new submitted data
    })
  }
}
