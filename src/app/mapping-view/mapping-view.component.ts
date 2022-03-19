import { Component, OnInit } from '@angular/core';
import { APIsService } from "../services/apis.service";

declare var $:any

@Component({
  selector: 'app-mapping-view',
  templateUrl: './mapping-view.component.html',
  styleUrls: ['./mapping-view.component.css']
})
export class MappingViewComponent implements OnInit {
  mapping:any;
  mappCode:any;
  mapp:any;
  row:any;
  deleteV:any;
  constructor(public apiService:APIsService) { 
  this.getmapp();
  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }

  async getmapp(){
    console.log($("lklkl").value);
    
        //send a get request to the backend to retrive all the mapping data from the database
        await this.apiService.getFun('mapping').subscribe(
          response => {
            this.mapping = response;//response variable holds all the data retrived then asign them to a variable cold data

        
          }
        )
      } 
      
      delete(row:any){
        this.mapp=row;
        console.log(row);
        
      }
      
      edit(text:any){
        this.mappCode=text;
      }

del()
{
  console.log(this.row);
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('delete',{ MappingType:this.row.MappingType,Source:this.row.Source,Target:this.row.Target}).subscribe(data => {
  this.deleteV=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.getmapp()
  })
}

}
