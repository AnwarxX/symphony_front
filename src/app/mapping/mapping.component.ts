import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  //this is the form group that contains all the mapping inputs with its validation
  form = new FormGroup({
    MappingCode:new FormControl("",Validators.compose([Validators.required])),
    Description:new FormControl("",Validators.compose([Validators.required])),
    mapp: new FormControl("",Validators.compose([Validators.required])),
    table:new FormControl("",Validators.compose([Validators.required])),
    column:new FormControl("",Validators.compose([Validators.required])),
    value:new FormControl("",Validators.compose([Validators.required])),
     level:new FormControl("",Validators.compose([Validators.required])),
     Revenue:new FormControl("",Validators.compose([Validators.required])),
    input:new FormControl("",Validators.compose([Validators.required]))
  })
  
  data=[];
  tableNames=[];
  ColumnNames=[];
  input:any;
  input2:any;
  input3:any;
  input4:any;
  values:any;
  deleteV:any;
  value:any;
  types=false;
  Property:any;
  mapping:any;
  revenue:any;
  row:any;
  tbvalue:any;
  disable=false;
  toggle=true;
  constructor(public httpClient:HttpClient) {
    this.tbvalue=[];
   this.getData();//returns all the table names 
   this.getmapp();//returns all the data for the home page to view
   this.revenueCenter();//returns all the data for the revenue center dropdown
  }
  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });

  }
  
  async getData(){
    //send a get request to the backend to retrive all the data in this endpoit
    await this.httpClient.get<any>('http://192.168.1.78:5000/SysData').subscribe(
      response => {
        this.data = response;//response variable holds all the data retrived then asign them to a variable cold data
        //loop that iterates over the objects in the data and returns only the table name then push it in an array called tableNames
        for (let i = 0; i < this.data.length; i++) {
          this.tableNames.push(this.data[i]["TableName"])
        }
      }
    )
  }  
  //this function is used to send a post request with a specific data from the inputs to the backend to insert this data in the databsae
  PreviewData(){
    let value= this.form.value//this.form.value holds all the values of the input in the interfacce then asign them to a vriable called value
    let tbody=`
    <tr class='tr'>
        <td><input class="MappingCode in form-control" aria-label="Disabled input example" disabled readonly value="${value.MappingCode}"></td>
        <td><input class="Description in form-control"   " value="${value.Description}" aria-label="Disabled input example" disabled readonly></td>
        <td><input class="mapp in form-control" value="${value.mapp}"></td>
        <td><input class="value in form-control" value="${value.value}"></td>
        <td><input class="Revenue in form-control" value="${value.Revenue}"></td>
        <td><input class="level in form-control" value="${value.level}"></td>
        <td><input class="input in form-control" value="${value.input}"></td>
    </tr>
    `
    
    console.log(tbody);
    this.tbvalue.push({MappingCode:value.MappingCode,Description:value.Description,MappingType:value.mapp,Source:value.value,RevenuCenter:value.Revenue,Level:value.level,input:value.input});
    $("#mappingData").html($("#mappingData").html()+tbody);
    $(".sub").removeClass("d-none")
    this.disable=true;
  }
  subm(){
    this.disable=false;
    console.log("djosiu");
    $('#liveToast').toast('show')
    //send a post request with all the inputs values to the backend to retrive all the data in this endpoit
    this.httpClient.post<any>('http://localhost:5000/mapping',this.tbvalue).subscribe(data => {
      this.tbvalue=data;//data variable holds all the data retrived then asign them to a variable cold value
      //this.getmapp()//then call this function again to render the new submitted data
    this.tbvalue=[]
      })
      
    console.log(this.tbvalue);
    console.log("djosiu");
    this.form.reset;
    this.ColumnNames=[]
    this.values=[]
    // this.tbvalue=[]
    this.form.setValue({MappingCode:"",Description:"",mapp:'',table:'',column:'',value:'',level:'',Revenue:'',input:''})
    // // this.form.value['value']=""
   
    
    $("#mappingData").html('');
    $(".sub").addClass("d-none")
    this.tbvalue=[];


  }
  switch(event:any){
    if (this.toggle) {
      this.toggle=false;
    }
    else{
      this.toggle=true;
    }
    console.log((<HTMLInputElement>event.target).value);
    
  }
  //this function is only called when you change the value from the table names dropdown and retrive all the column names for the choosen table name
  enter(event: any)
  {
    this.input=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    this.values=[]
    //loop that iterates over the objects in the data and returns only the column names then push it in an array called ColumnNames for the choosen table name
     for (let i = 0; i < this.data.length; i++) {
       if (this.data[i]["TableName"]==this.input) {

        this.ColumnNames= this.data[i]["ColumnNames"]
               
        break;
       }
     }
     console.log(this.ColumnNames);
     
     this.form.value['value']=""//clear the value of the value drop down so the user can choose again if he decid to change the table name after he chose the value
  }
  //this function is only called when you change the value from the column names dropdown and retrive all the distinct value for the choosen column name
  rows(event: any)
  {
    this.input2=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
    this.httpClient.post<any>('http://192.168.1.78:5000/SysDataHandler', { column:this.input2 ,table:this.input }).subscribe(data => {
    this.values=data;//data variable holds all the data retrived then asign them to a variable cold value
    })
  }
  //this function is used to change the boolean variable type from false to true to show the level and revenue dropdown if the user choose the analysis value from 
  //the drop down and vis versa if he choose account
  type(event: any)
  {
    this.input3=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    if (this.input3=="Analysis") {
      this.form.get('level')?.setValidators([Validators.required])
      this.form.get('Revenue')?.setValidators([Validators.required])
      this.types=true
    }
    else{
      this.types=false
      this.removeValidators(this.form,'level')
      this.removeValidators(this.form,'Revenue')
    }
  }
  //this function is used to clear all the validation of an input
  public removeValidators(form: FormGroup,str:any) {
        this.form.get(str)?.clearValidators();
        this.form.get(str)?.updateValueAndValidity();
    }

  async getmapp(){
console.log($("#for").value);

    //send a get request to the backend to retrive all the mapping data from the database
    await this.httpClient.get<any>('http://192.168.1.78:5000/mapping').subscribe(
      response => {
        this.mapping = response;//response variable holds all the data retrived then asign them to a variable cold data
      }
    )
  }    
  
async revenueCenter(){
  //send a get request to the backend to retrive all the revenue centers data from the database
  await this.httpClient.get<any>('http://192.168.1.78:5000/revenue').subscribe(
    response => {
      this.revenue = response;//response variable holds all the data retrived then asign them to a variable cold data
    }
  )
} 
del()
{
  console.log(this.row);
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.httpClient.post<any>('http://192.168.1.78:5000/delete',{ MappingType:this.row.MappingType,Source:this.row.Source,Target:this.row.Target}).subscribe(data => {
  this.deleteV=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.getmapp()
  })
}

delete(i:any){
  this.row = i
}
}