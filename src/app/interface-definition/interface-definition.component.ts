import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
import { log } from 'console';
import { ThrowStmt } from '@angular/compiler';

declare var $:any //declear $ to use jquery


@Component({
  selector: 'app-interface-definition',
  templateUrl: './interface-definition.component.html',
  styleUrls: ['./interface-definition.component.css']
})
export class InterfaceDefinitionComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  interfaceCode:new FormControl("",Validators.compose([Validators.required])),
  type:new FormControl("",Validators.compose([Validators.required])),
  sunCode:new FormControl("",Validators.compose([Validators.required])),
  mappCode:new FormControl("",Validators.compose([Validators.required])),
  BUCode:new FormControl("",Validators.compose([Validators.required])),

})
authData:any;
dis:any;
x:any;
mapp:any;
interfaces:any;
input:any;
types:any;
input2:any;
values:any;
DefinationCodes:any;
DefinationTypes:any;
Combo:any;

 

  constructor(public apiService:APIsService) { 
    this.imports('API')
  }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white '
  });

  }
  type(event: any)
  {
    this.input=(<HTMLInputElement>event.target).value;//retrive the value choosen from theb dropdown
    this.imports(this.input)
  }

  rows(event: any)
  {
    console.log((<HTMLInputElement>event.target).value);
    
    this.imports((<HTMLInputElement>event.target).value)
  }
authorization()
{
  let tok =  localStorage.getItem('token');
  var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
  var originalText = bytes.toString(cryptoJS.enc.Utf8);
  let x=JSON.parse(originalText)
   
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('setInterfaceDeinition',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.authData=data
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  })
}
imports(typ:any){
  this.DefinationCodes=[]
  this.apiService.getFun('getInterfaceDeinition').subscribe(data => {
   if(typ=='CAPS')
   {
    for (let i = 0; i < data.caps.length; i++) {
      this.DefinationCodes.push(data.caps[i].capsCode)
    }
   }
   else
   {
    for (let i = 0; i < data.api.length; i++) {
      this.DefinationCodes.push(data.api[i].interfaceCode)
    }
   }
   this.Combo=data
   
    })
}
}
