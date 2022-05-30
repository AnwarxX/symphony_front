import { Component, OnInit } from '@angular/core';
import { APIsService } from "../services/apis.service";
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { log } from 'console';

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
    locRef:new FormControl("",Validators.compose([Validators.required])),
    mapp: new FormControl("",Validators.compose([Validators.required])),
    table:new FormControl(""),
    column:new FormControl(""),
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
  fileToUpload: File | null = null;
  myValue:any;
  de:any;

  constructor(public apiService:APIsService) {
    this.tbvalue=[];
   this.getData();//returns all the table names 
   this.getmapp();//returns all the data for the home page to view
   this.revenueCenter();//returns all the data for the revenue center dropdown
  }
  ngOnInit(): void {
  //   $('#home').particleground({
  //     dotColor: 'cadetblue',
  //     lineColor: 'white'
  // });

  }
  
  async getData(){
    //send a get request to the backend to retrive all the data in this endpoit
    await this.apiService.getFun('SysData').subscribe(
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
    
    // let tbody=`
    // <tr class='tr'>
    //     <td><input class="MappingCode in form-control" aria-label="Disabled input example" disabled readonly value="${value.MappingCode}"></td>
    //     <td><input class="Description in form-control"   " value="${value.Description}" aria-label="Disabled input example" disabled readonly></td>
    //     <td><input class="locRef in form-control"   " value="${value.locRef}" aria-label="Disabled input example"></td>
    //     <td><input class="mapp in form-control" value="${value.mapp}" aria-label="Disabled input example" disabled readonly></td>
    //     <td><input class="value in form-control" value="${value.value}" ></td>
    //     <td><input class="Revenue in form-control" value="${value.Revenue}" aria-label="Disabled input example" disabled readonly></td>
    //     <td><input class="level in form-control" value="${value.level}" aria-label="Disabled input example" disabled readonly></td>
    //     <td><input class="input in form-control" value="${value.input}" ></td>
    //     <td><button class="btn btn-danger" data-bs-target="#delete" data-bs-toggle="modal" (click)="delete(${value})" >Delete</button></td>
    // </tr>
    // `
    console.log('add');
    this.tbvalue.push({MappingCode:value.MappingCode,Description:value.Description,locRef:value.locRef,MappingType:value.mapp,Source:value.value,RevenuCenter:value.Revenue,Level:value.level,input:value.input});
    // $("#mappingData").html($("#mappingData").html()+tbody);
    
    $(".sub").removeClass("d-none")
    this.disable=true;
    console.log(this.tbvalue);
  }
  subm(){
    var arrlocRef = $('.locRef').map((i:any, e:any) => e.value).get();
    var arrvalue = $('.value').map((i:any, e:any) => e.value).get();
    var arrinput = $('.input').map((i:any, e:any) => e.value).get();
    for (let i = 0; i < this.tbvalue.length; i++) {
      for (let j = 0; j < Object.keys(this.tbvalue[i]).length; j++) {
        if (Object.keys(this.tbvalue[i])[j]=="locRef") {
          this.tbvalue[i].locRef=arrlocRef[i]
        }
        if (Object.keys(this.tbvalue[i])[j]=="value") {
          this.tbvalue[i].value=arrvalue[i]
        }
        if (Object.keys(this.tbvalue[i])[j]=="input") {
          this.tbvalue[i].input=arrinput[i]
        }
      }
    }
    this.disable=false;
    //send a post request with all the inputs values to the backend to retrive all the data in this endpoit
    this.apiService.postFun('mapping',this.tbvalue).subscribe(data => {
      this.tbvalue=data;//data variable holds all the data retrived then asign them to a variable cold value
      //this.getmapp()//then call this function again to render the new submitted data
    this.tbvalue=[]
    $('#liveToast').toast('show')
    $('.toast-body').text(data)
    this.form.setValue({MappingCode:"",Description:"",locRef:'',mapp:'',table:'',column:'',value:'',level:'',Revenue:'',input:''})
      })
      
    this.form.reset;
    this.ColumnNames=[]
    this.values=[]
    // this.tbvalue=[]
    // this.form.setValue({MappingCode:"",Description:"",mapp:'',table:'',column:'',value:'',level:'',Revenue:'',input:''})
    // // this.form.value['value']=""
    $(".sub").addClass("d-none")
    this.tbvalue=[];


  }
  
  switch(event:any){
    if (this.toggle) {
      // this.removeValidators(this.form,'table')
      // this.removeValidators(this.form,'column')
      // this.form.get('column')?.setValidators([Validators.required])
      // this.form.get('table')?.setValidators([Validators.required])
      this.form.controls['column'].setErrors(null);
      this.form.controls['table'].setErrors(null);
      this.form.get('column')?.updateValueAndValidity
      this.form.get('table')?.updateValueAndValidity
      
      this.toggle=false;

    }
    else{
      // this.form.get('table')?.setValidators([Validators.required])
      // this.form.get('column')?.setValidators([Validators.required])
      // this.form.get('column')?.clearValidators
      // this.form.get('table')?.clearValidators
      this.form.controls['column'].setErrors({'required': true});
      this.form.controls['table'].setErrors({'required': true});
      this.form.patchValue({table:this.form.get('table')?.value,column:this.form.get('column')?.value,value:undefined})
      this.form.get('column')?.updateValueAndValidity
      this.form.get('table')?.updateValueAndValidity

      this.toggle=true;

    }
    // console.log(this.form.get('value')?.value);
    // this.form.patchValue({data:undefined})
    console.log(this.form.get('value')?.value);
    
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
     
     this.form.value['value']=""//clear the value of the value drop down so the user can choose again if he decid to change the table name after he chose the value
  }
  //this function is only called when you change the value from the column names dropdown and retrive all the distinct value for the choosen column name
  rows(event: any)
  {
    this.input2=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
    this.apiService.postFun('SysDataHandler', { column:this.input2 ,table:this.input }).subscribe(data => {
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

    //send a get request to the backend to retrive all the mapping data from the database
    await this.apiService.getFun('mapping').subscribe(
      response => {
        this.mapping = response;//response variable holds all the data retrived then asign them to a variable cold data
      }
    )
  }    
  
async revenueCenter(){
  //send a get request to the backend to retrive all the revenue centers data from the database
  await this.apiService.getFun('revenue').subscribe(
    response => {
      this.revenue = response;//response variable holds all the data retrived then asign them to a variable cold data
    }
  )
} 
del()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.tbvalue.splice(this.tbvalue.indexOf(this.myValue),1)
}
handleFileInput(event: any) {
  this.fileToUpload = event.target.files;
}

delete(i:any){
  this.myValue=i;
}
}