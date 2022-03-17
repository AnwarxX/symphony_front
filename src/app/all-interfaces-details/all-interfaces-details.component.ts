import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-all-interfaces-details',
  templateUrl: './all-interfaces-details.component.html',
  styleUrls: ['./all-interfaces-details.component.css']
})
export class AllInterfacesDetailsComponent implements OnInit {
  form2 = new FormGroup({
    username:new FormControl("",Validators.compose([Validators.required])),
    password:new FormControl("",Validators.compose([Validators.required])),
    email:new FormControl("",Validators.compose([Validators.required])),
    enterpriseShortName:new FormControl("",Validators.compose([Validators.required])),
    clientId:new FormControl("",Validators.compose([Validators.required])),
    lockRef:new FormControl("",Validators.compose([Validators.required])),
    ApiSchedule:new FormControl("",Validators.compose([Validators.required])),
    ApiScheduleStatue:new FormControl("",Validators.compose([Validators.required])),
    SunUser:new FormControl("",Validators.compose([Validators.required])),
    SunPassword:new FormControl("",Validators.compose([Validators.required])),
    Sunserver:new FormControl("",Validators.compose([Validators.required])),
    SunDatabase:new FormControl("",Validators.compose([Validators.required])),
    SunSchedule:new FormControl("",Validators.compose([Validators.required])),
    SunScheduleStatue:new FormControl("",Validators.compose([Validators.required])),
    interfaceCode:new FormControl(),
  })
  reply:any;
  x:any;
  interfaces:any;
  apis:any;
  interfaceData:any;
  interfaceCod:any;
  rowInput:any;
  apiDate:any;
  sunDate:any;
  reviewInput=
  {ApiSchedule: "",
ApiScheduleStatue: "",
SunDatabase: "",
SunPassword: "",
SunSchedule: "",
SunScheduleStatue: "",
SunUser: "",
Sunserver: "",
clientId: "",
email: "",
enterpriseShortName: "",
interfaceCode: 0,
lockRef: "",
password: "",
username: ""};
  dateDisable=false;
  authData:any;
  dis:any;
  form = new FormGroup({
    startDate:new FormControl("",Validators.compose([Validators.required])),
    endDate:new FormControl("",Validators.compose([Validators.required])),
    interfaceCode: new FormControl("",Validators.compose([Validators.required])),
    api:new FormControl("",Validators.compose([Validators.required]))
  })
  form3 = new FormGroup({
    date:new FormControl("",Validators.compose([Validators.required]))
  })
  constructor(public httpClient:HttpClient) { 
    console.log(this.getDaysArray("2022-02-20","2022-02-23")[0].toISOString().split("T")[0]);
    this.imports()
    this.getInterfaceData()
  }
  diss(event:any){
    this.dis=(<HTMLInputElement>event.target).value;
    if (this.dis=="day") {
      $(".sunEveryDay").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $('.sunEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.sunEveryYear').val("yyyy-MM-ddThh:mm");

    }
    else if(this.dis=="month"){
      $(".sunEveryMonth").removeAttr('disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $('.sunEveryYear').val("yyyy-MM-ddThh:mm");
      $('.sunEveryDay').val("hh:mm");
    }
    else if(this.dis=="year"){
      $(".sunEveryYear").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $('.sunEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.sunEveryDay').val("hh:mm");
    }
    if (this.dis=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");


      
    }
    else if(this.dis=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
      $('.apiEveryDay').val("hh:mm");
    }
    else if(this.dis=="apiyear"){
      $(".apiEveryYear").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.apiEveryDay').val("hh:mm");


    }
  }
  
  dissEdit(){
    this.apiDate = this.reviewInput.ApiSchedule.split(" ")
    this.sunDate = this.reviewInput.SunSchedule.split(" ")

    if (this.reviewInput.SunScheduleStatue=="day") {
      $(".sunEveryDay").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $("#exampleRadiosSun1").prop('checked',true);
      $('.sunEveryDay').val( 
      ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
      ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]);   
    }
    else if(this.reviewInput.SunScheduleStatue=="month"){
      $(".sunEveryMonth").removeAttr('disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $("#exampleRadiosSun2").prop('checked',true);
      $('.sunEveryMonth').val(new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.sunDate[3] < 10) ? "0" :'')+this.sunDate[3] + "T" +  
      ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
      ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]); 
    }
    else if(this.reviewInput.SunScheduleStatue=="year"){
      $(".sunEveryYear").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $("#exampleRadiosSun3").prop('checked',true);
      $('.sunEveryYear').val(new Date().getFullYear() + "-" +  
      ((this.sunDate[4] < 10) ? "0" :'')+this.sunDate[4] + "-" + 
      ((this.sunDate[3] < 10) ? "0" :'')+this.sunDate[3] + "T" +  
      ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
      ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]); 
    }
    if (this.reviewInput.ApiScheduleStatue=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $("#exampleRadios1").prop('checked',true);
      $('.apiEveryDay').val( 
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]); 
 


    }
    else if(this.reviewInput.ApiScheduleStatue=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $("#exampleRadios2").prop('checked',true);
      $('.apiEveryMonth').val(new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.apiDate[3] < 10) ? "0" :'')+this.apiDate[3] + "T" +  
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]); 


      
    }
    else if(this.reviewInput.ApiScheduleStatue=="apiyear"){
      $(".apiEveryYear").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $("#exampleRadios3").prop('checked',true);
      $('.apiEveryYear').val(new Date().getFullYear() + "-" +  
      ((this.apiDate[4] < 10) ? "0" :'')+this.apiDate[4] + "-" + 
      ((this.apiDate[3] < 10) ? "0" :'')+this.apiDate[3] + "T" +  
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]); 



    }
  }
    ngOnInit(): void {
      $('#home').particleground({
        dotColor: 'cadetblue',
        lineColor: 'white '
    });
    
  }
  getInterfaceData(){

    this.httpClient.get<any>('http://localhost:5000/importInterface').subscribe(data => {

      this.interfaceData=data;//data variable holds all the data retrived then asign them to a variable cold value      
      console.log(this.interfaceData[1].BU);      

    })

  }
  importBtn(text:any){
    this.interfaceCod=text;
  }
  importSun(){
    console.log("asfujhasfikju");
    
    this.httpClient.post<any>('http://localhost:5000/importSun',{interfaceCod:parseInt(this.interfaceCod),date:this.form3.get('date')?.value}).subscribe(data => {
      console.log(data);      
    })
  }
  deleteBtn(row:any){
    this.rowInput=row;

  }
  editBtn(row:any){
    this.reviewInput=row;

    this.httpClient.post<any>('http://localhost:5000/reviewInterface',this.reviewInput).subscribe(data => {
      delete data.refreshToken;
      delete data.token;

    console.log(data);
      
      this.form2.setValue(data);
      this.reviewInput=data;
      console.log(this.reviewInput);
      this.dissEdit()
      
    })
  }
  update()
  {
    //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
    this.httpClient.post<any>('http://localhost:5000/update',this.form2.value).subscribe(data => {
    // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
    console.log(data);
    this.authData=""
    for (let i = 0; i < data.length; i++) {
      this.authData+=data[i]+" "
    }
    $('#liveToast').toast('show')
    $('.toast-body').html(this.authData)
    
    })
  }
  confirmDelete(){
    this.httpClient.post<any>('http://localhost:5000/deleteInterface',this.rowInput).subscribe(data => {
      console.log(data);
      this.getInterfaceData()
    })
  }
  disableDate(event:any){
    console.log((<HTMLInputElement>event.target).value);
    if((<HTMLInputElement>event.target).value.includes("Daily")||(<HTMLInputElement>event.target).value.includes("all")||(<HTMLInputElement>event.target).value=="getGuestChecks"){
      this.dateDisable=true;
    }
    else{
      this.dateDisable=false;
    }
  }
  authorization()
{
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.httpClient.post<any>('http://localhost:5000/authorization',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  console.log(data);
  this.authData=""
  for (let i = 0; i < data.length; i++) {
    this.authData+=data[i]+" "
  }
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  
  })
}
  imports(){
    this.httpClient.get<any>('http://localhost:5000/interfaceCode').subscribe(data => {
      this.apis=data.apidata;//data variable holds all the data retrived then asign them to a variable cold value
      this.interfaces=data.interfacedata;//data variable holds all the data retrived then asign them to a variable cold value
      console.log(this.apis);
      console.log(this.interfaces);
    })
  }
  start(){
    this.httpClient.get<any>('http://localhost:5000/start').subscribe(data => {
    this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
    //this.getmapp()//then call this function again to render the new submitted data
    })
  }
  
  stop(){
    this.httpClient.get<any>('http://localhost:5000/stop').subscribe(data => {
    this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
    //this.getmapp()//then call this function again to render the new submitted data
    })
  }
  getDaysArray(s:any,e:any) {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
  import()
  {
    let start=this.form.get('startDate')?.value;
    let end=this.form.get('endDate')?.value;
    this.x=[]
    for (let i = 0; i < this.getDaysArray(start,end).length; i++) {
      this.httpClient.post<any>('http://localhost:5000/import',{interface:this.interfaceCod,date:this.getDaysArray(start,end)[i].toISOString().split("T")[0],api:this.form.get('api')?.value}).subscribe(data => {
        this.x.push(data)
        if (this.x.length==this.getDaysArray(start,end).length) {
          console.log(this.x);
        }
      })
    }
  }
}
