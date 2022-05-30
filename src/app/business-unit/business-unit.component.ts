import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
declare var $:any //declear $ to use jquery


@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.css']
})
export class BusinessUnitComponent implements OnInit {
  mapp:any;
  interfaces:any;
  //this is the form group that contains all the property setting inputs with its validation
  form2 = new FormGroup({
    BU: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)])),
    JournalType:new FormControl("",Validators.compose([Validators.required,Validators.maxLength(5)])),
    Currencycode:new FormControl("",Validators.compose([Validators.required])),
    LedgerImportDescription:new FormControl("",Validators.compose([Validators.required])),
    SuspenseAccount:new FormControl("",Validators.compose([Validators.required])),
  })
  value:any;
  constructor(public apiService:APIsService) {
    this.imports()

   }
    //this function is used to send a post request to the end point in the backend with a specific data to insert them in the database
    PropertySettings(){
      let value= this.form2.value//this.form2.value holds all the values of the input in the interfacce then asign them to a vriable called value
      //send a post request with all the inputs values to the backend to retrive all the data in this endpoit
      this.apiService.postFun('PropertySettings',value).subscribe(data => {
        this.value=data;//data variable holds all the data retrived then asign them to a variable cold value
        $('#liveToast').toast('show')
        $('.toast-body').html(this.value)
      })
     


    } 
    imports(){
      this.apiService.getFun('codes').subscribe(data => {
        this.mapp=data.mapping;//data variable holds all the data retrived then asign them to a variable cold value
        this.interfaces=data.intreface;//data variable holds all the data retrived then asign them to a variable cold value
      })
    }
     ngOnInit(): void {
  //   $('#home').particleground({
  //     dotColor: 'cadetblue',
  //     lineColor: 'white'
  // });
  }


}
