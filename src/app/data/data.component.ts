import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStylevalid={'background-color':'gray','border-color':'gray'}
  input=""
  data:any;
  dataFilter=[]
  constructor(private httpClient:HttpClient) {
    this.getData();
  }
  ngOnInit(): void { 
  }
  getData(){
    this.httpClient.get<any>('http://192.168.1.78:5000/SysData'+this.input).subscribe(
      response=>{
        this.data=response
      }
    )
  }
  
  enter(event: any)
  {
     this.input=(<HTMLInputElement>event.target).value;
     if (this.input!="") {
       this.data.forEach(function () {
      }); 
       for (let i = 0; i < this.data.length; i++) {
         if (this.data[i].opnBusDt==this.input) {
         }
       }
     }
     this.getData();
  }

}
