import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
import { log } from 'console';

declare var $:any //declear $ to use jquery

@Component({
  selector: 'caps-new-interface',
  templateUrl: './caps-interface.component.html',
  styleUrls: ['./caps-interface.component.css']
})
export class CapsInterfaceComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  connection:new FormControl("",Validators.compose([Validators.required])),
  CapsPassword:new FormControl("",Validators.compose([Validators.required])),
  Capsserver:new FormControl("",Validators.compose([Validators.required])),
  CapsDatabase:new FormControl("",Validators.compose([Validators.required])),
  CapslocRef:new FormControl("",Validators.compose([Validators.required])),

})
authData:any;
dis:any;
x:any;



constructor(public apiService:APIsService) { 
}

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white '
  });

  }

  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".CapsEveryDays").removeAttr('disabled');
      $(".CapsEveryMonth").attr('disabled', 'disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $('.CapsEveryMonth').val("yyyy-MM-ddThh:mm");

    }
    else if(this.dis=="month"){
      $(".CapsEveryMonth").removeAttr('disabled');
      $(".CapsEveryYear").attr('disabled', 'disabled');
      $(".CapsEveryDays").attr('disabled', 'disabled');
      $('.CapsEveryYear').val("yyyy-MM-ddThh:mm");
      $('.CapsEveryDays').val("hh:mm");
    }
   

    }
 
   
  
authorization()
{
  let tok =  localStorage.getItem('token');
  var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
  var originalText = bytes.toString(cryptoJS.enc.Utf8);
  let x=JSON.parse(originalText)
  
  if(x[0].LockRef == this.form2.get("CapslocRef")?.value){

   
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('addCaps',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.authData=""
  for (let i = 0; i < data.length; i++) {
    this.authData+=data[i]+" "
  }
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  })
}else{
  $('#liveToast').toast('show')
  $('.toast-body').html("License and configuration doesn't match")

}
}


}
