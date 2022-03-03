import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any //declear $ to use jquery


@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.css']
})
export class BusinessUnitComponent implements OnInit {

  //this is the form group that contains all the property setting inputs with its validation
  form2 = new FormGroup({
    BU: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)])),
    JournalType:new FormControl("",Validators.compose([Validators.required,Validators.maxLength(5)])),
    Currencycode:new FormControl("",Validators.compose([Validators.required])),
    LedgerImportDescription:new FormControl("",Validators.compose([Validators.required])),
    SuspenseAccount:new FormControl("",Validators.compose([Validators.required])),
    ConnectionCode:new FormControl("",Validators.compose([Validators.required])),
    MappingCode:new FormControl("",Validators.compose([Validators.required])),
  })
  value:any;
  constructor(public httpClient:HttpClient) { }

    //this function is used to send a post request to the end point in the backend with a specific data to insert them in the database
    PropertySettings(){
      let value= this.form2.value//this.form2.value holds all the values of the input in the interfacce then asign them to a vriable called value
      //send a post request with all the inputs values to the backend to retrive all the data in this endpoit
      this.httpClient.post<any>('http://localhost:5000/PropertySettings',value).subscribe(data => {
        this.value=data;//data variable holds all the data retrived then asign them to a variable cold value
      })
      $('#liveToast').toast('show')

    } 

     ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
 

  }

  
 

}
