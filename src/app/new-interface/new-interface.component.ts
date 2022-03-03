import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-new-interface',
  templateUrl: './new-interface.component.html',
  styleUrls: ['./new-interface.component.css']
})
export class NewInterfaceComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  userName:new FormControl("",Validators.compose([Validators.required])),
  password:new FormControl("",Validators.compose([Validators.required])),
  email:new FormControl("",Validators.compose([Validators.required])),
  enterpriseShortName:new FormControl("",Validators.compose([Validators.required])),
  clientId:new FormControl("",Validators.compose([Validators.required])),
  lockRef:new FormControl("",Validators.compose([Validators.required])),
  ApiSchedule:new FormControl("",Validators.compose([Validators.required])),
  SunUser:new FormControl("",Validators.compose([Validators.required])),
  SunPassword:new FormControl("",Validators.compose([Validators.required])),
  Sunserver:new FormControl("",Validators.compose([Validators.required])),
  SunDatabase:new FormControl("",Validators.compose([Validators.required])),
  SunSchedule:new FormControl("",Validators.compose([Validators.required])),

})
authData:any;
constructor(public httpClient:HttpClient) { }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white '
  });

  }
authorization()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.httpClient.post<any>('http://localhost:5000/authorization',this.form2.value).subscribe(data => {
  this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  console.log(data);
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)

  
  })
}

}
