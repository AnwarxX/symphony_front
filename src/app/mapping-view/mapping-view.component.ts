import { Component, OnInit } from '@angular/core';
import { APIsService } from "../services/apis.service";
import { log } from 'console';

declare var $:any

@Component({
  selector: 'app-mapping-view',
  templateUrl: './mapping-view.component.html',
  styleUrls: ['./mapping-view.component.css']
})
export class MappingViewComponent implements OnInit {
  mapping:any;
  seaMapping:any;
  all=true;
  mappCode:any;
  mapp:any;
  row:any;
  deleteV:any;
  constructor(public apiService:APIsService) { 
  this.getmapp();
  }

  ngOnInit(): void {
  //   $('#home').particleground({
  //     dotColor: 'cadetblue',
  //     lineColor: 'white'
  // });
  }

  async getmapp(){
    
        //send a get request to the backend to retrive all the mapping data from the database
        await this.apiService.getFun('mapping').subscribe(
          response => {
            this.mapping = response;//response variable holds all the data retrived then asign them to a variable cold data
        
          }
        )
      } 
      search(event:any){
        if ((<HTMLInputElement>event.target).value=="") {
          this.all=true
        }
        else {
          this.all=false
          this.seaMapping=[]
          for (let i = 0; i < this.mapping.length; i++) {
            if(this.mapping[i].MappingCode.toLowerCase().includes((<HTMLInputElement>event.target).value.toLowerCase()))
              this.seaMapping.push(this.mapping[i])
          }
          console.log(this.seaMapping);
          
        }
      }
      delete(mapp:any){
        this.row=mapp;
      }
      
      // edit(text:any){
      //   this.mappCode=text;
      //   let tbody=`  
      //   <form class="d-flex">
      //   <input class="MappingCode in form-control"  value="${this.mappCode.MappingCode}">
      //   <input class="Description in form-control"   value="${this.mappCode.Source}"  >
      //   <input class="mapp in form-control" value="${this.mappCode.MappingType}">
      //   <input class="value in form-control" value="${this.mappCode.Target}">
      //   <form>
      //   `
      //   $("#mappingData").html($("#mappingData").html()+tbody);

      // }

del()
{
  this.all=true
  $(".searchInp").val("")
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('delete',{ MappingType:this.row.MappingType,Source:this.row.Source,Target:this.row.Target}).subscribe(data => {
  this.deleteV=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.getmapp()
  })
}
// ed(){

// }

}
