import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { APIsService } from "../services/apis.service";
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-all-interfaces-details',
  templateUrl: './all-interfaces-details.component.html',
  styleUrls: ['./all-interfaces-details.component.css']
})
export class AllInterfacesDetailsComponent implements OnInit {
  form2 = new FormGroup({
    connectionCode:new FormControl("",Validators.compose([])),
    interfaceCode:new FormControl("",Validators.compose([Validators.required])),
    type:new FormControl("",Validators.compose([])),
    sunCode:new FormControl("",Validators.compose([Validators.required])),
    mappCode:new FormControl("",Validators.compose([Validators.required])),
    BUCode:new FormControl("",Validators.compose([Validators.required])),
  })
  reply:any;
  x:any;
  interfaces:any;
  apis:any;
  interfaceData:any;
  interfaceCod:any;
  rowInput:any;
  apiDate:any;
  toggle:any;
  sunDate:any;
  reviewInput:any;
  dateDisable=false;
  authData:any;
  dis:any;
  importType:any;
  form = new FormGroup({
    startDate:new FormControl(""),
    endDate:new FormControl(""),
    interfaceCode: new FormControl(""),
    api:new FormControl("",Validators.compose([Validators.required]))
  })
  form3 = new FormGroup({
    date:new FormControl("",Validators.compose([Validators.required]))
  })
  DefinationCodes: any;
  Combo: any;
  constructor(public apiService:APIsService) { 
    this.importConnections()
    this.getInterfaceData()
    this.reviewInput=this.form2.value
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
  test(event:any){
    let date=(<HTMLInputElement>event.target).value
    $(".apiDate").attr("min",date)
    $(".apiDate").attr("max",new Date(new Date(date).setDate(new Date(date).getDate()+6)).toISOString().split("T")[0])
  }
  test2(event:any){
    let date=(<HTMLInputElement>event.target).value
    
  }
  startStop(event:any,connectionCode:any){
    if ( event.target.checked ) {
      this.apiService.postFun('startSun',{connectionCode}).subscribe(data => {
      this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
      //this.getmapp()//then call this function again to render the new submitted data
      })
      this.toggle=true
    }
    else{
      this.apiService.postFun('stopSun',{connectionCode}).subscribe(data => {
      this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
      //this.getmapp()//then call this function again to render the new submitted data
      })
      this.toggle=false
    }
    console.log(this.toggle,connectionCode);
  }
  dissEdit(){
    this.apiDate = this.reviewInput.ApiSchedule.split(" ")
    this.sunDate = this.reviewInput.SunSchedule.split(" ")
    if (this.reviewInput.SunScheduleStatue=="day") {
      $(".sunEveryDay").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $("#exampleRadiosSun1").prop('checked',true);
        this.form2.patchValue({SunSchedule:
        ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
        ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]})
        $('.sunEveryMonth').val("yyyy-MM-ddThh:mm");
        $('.sunEveryYear').val("yyyy-MM-ddThh:mm");
    }
    else if(this.reviewInput.SunScheduleStatue=="month"){
      this.form2.patchValue({SunSchedule:new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.sunDate[3] < 10) ? "0" :'')+this.sunDate[3] + "T" +  
      ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
      ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]})
      $(".sunEveryMonth").removeAttr('disabled');
      $(".sunEveryYear").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $("#exampleRadiosSun2").prop('checked',true);
      $('.sunEveryYear').val("yyyy-MM-ddThh:mm");
      $('.sunEveryDay').val("hh:mm");
    }
    else if(this.reviewInput.SunScheduleStatue=="year"){
      $(".sunEveryYear").removeAttr('disabled');
      $(".sunEveryMonth").attr('disabled', 'disabled');
      $(".sunEveryDay").attr('disabled', 'disabled');
      $("#exampleRadiosSun3").prop('checked',true);
      this.form2.patchValue({SunSchedule:new Date().getFullYear() + "-" +  
      ((this.sunDate[4] < 10) ? "0" :'')+this.sunDate[4] + "-" + 
      ((this.sunDate[3] < 10) ? "0" :'')+this.sunDate[3] + "T" +  
      ((this.sunDate[2] < 10) ? "0" :'')+this.sunDate[2] + ":" + 
      ((this.sunDate[1] < 10) ? "0" :'')+this.sunDate[1]})
      $('.sunEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.sunEveryDay').val("hh:mm");
    }
    if (this.reviewInput.ApiScheduleStatue=="apiday") {
      $(".apiEveryDay").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $("#exampleRadios1").prop('checked',true);
      this.form2.patchValue({ApiSchedule:
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]})
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
      
    }
    else if(this.reviewInput.ApiScheduleStatue=="apimonth"){
      $(".apiEveryMonth").removeAttr('disabled');
      $(".apiEveryYear").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $("#exampleRadios2").prop('checked',true);
      this.form2.patchValue({ApiSchedule:new Date().getFullYear() + "-" +  
      (((new Date().getMonth()+1) < 10) ? "0" :'')  +(new Date().getMonth()+ 1)+ "-" + 
      ((this.apiDate[3] < 10) ? "0" :'')+this.apiDate[3] + "T" +  
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]})
      $('.apiEveryDay').val("hh:mm");
      $('.apiEveryYear').val("yyyy-MM-ddThh:mm");
    }
    else if(this.reviewInput.ApiScheduleStatue=="apiyear"){
      $(".apiEveryYear").removeAttr('disabled');
      $(".apiEveryMonth").attr('disabled', 'disabled');
      $(".apiEveryDay").attr('disabled', 'disabled');
      $("#exampleRadios3").prop('checked',true);
      this.form2.patchValue({ApiSchedule:new Date().getFullYear() + "-" +  
      ((this.apiDate[4] < 10) ? "0" :'')+this.apiDate[4] + "-" + 
      ((this.apiDate[3] < 10) ? "0" :'')+this.apiDate[3] + "T" +  
      ((this.apiDate[2] < 10) ? "0" :'')+this.apiDate[2] + ":" + 
      ((this.apiDate[1] < 10) ? "0" :'')+this.apiDate[1]})
      $('.apiEveryMonth').val("yyyy-MM-ddThh:mm");
      $('.apiEveryDay').val("hh:mm");
    }
  }
    ngOnInit(): void {
      $('#home').particleground({
        dotColor: 'cadetblue',
        lineColor: 'white '
    });
    
  }
  getInterfaceData(){
    this.apiService.getFun("importInterface").subscribe(data => {

        this.interfaceData=data;//data variable holds all the data retrived then asign them to a variable cold value   
      console.log(this.interfaceData);
      
      });//data variable holds all the data retrived then asign them to a variable cold value     
    // this.httpClient.get<any>('http://localhost:5000/importInterface').subscribe(data => {

    //   this.interfaceData=data;//data variable holds all the data retrived then asign them to a variable cold value          

    // })

  }
  importBtn(text:any,type:any){
    this.interfaceCod=text;
    this.importType=type;
    this.imports(type)
  }
  importSun(){
    
    this.apiService.postFun('importSun',{interfaceCod:parseInt(this.interfaceCod),date:this.form3.get('date')?.value}).subscribe(data => {
    })
  }
  deleteBtn(row:any){
    this.rowInput=row;
  }
  editBtn(row:any){
    this.reviewInput=row;
    console.log(this.reviewInput);
    this.form2.setValue({
      connectionCode:this.reviewInput.connectionCode,
      interfaceCode:this.reviewInput.interfaceCode,
      type:this.reviewInput.type,
      sunCode:this.reviewInput.sunCode,
      mappCode:this.reviewInput.mappCode,
      BUCode:this.reviewInput.BUCode,
    })
    console.log(this.form2.value);
    // this.apiService.postFun('reviewInterface',this.reviewInput).subscribe(data => {
    //   delete data.refreshToken;
    //   delete data.token;

    //   this.form2.setValue(data);
    //   this.reviewInput=data;
    //   this.dissEdit()
      
    // })
    console.log(this.reviewInput);
  }
  update()
  {
    this.form2.setValue({connectionCode:this.reviewInput.connectionCode})
    //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
    this.apiService.postFun('update',this.form2.value).subscribe(data => {
    // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
    this.authData=""
    for (let i = 0; i < data.length; i++) {
      this.authData+=data[i]+" "
    }
    $('#liveToast').toast('show')
    $('.toast-body').html(this.authData)
    })
  }
  confirmDelete(){
    console.log(this.rowInput);
    this.apiService.postFun('deleteInterface',{interfaceCode:this.rowInput}).subscribe(data => {
      this.getInterfaceData()
    })
  }
  disableDate(event:any){
    if((<HTMLInputElement>event.target).value.includes("Daily")||(<HTMLInputElement>event.target).value.includes("all")||(<HTMLInputElement>event.target).value=="getGuestChecks"){
      this.dateDisable=true;
      this.form.get('startDate')?.setValidators([Validators.required])
      this.form.get('endDate')?.setValidators([Validators.required])
    }
    else{
      this.dateDisable=false;
      this.removeValidators(this.form,'startDate')
      this.removeValidators(this.form,'endDate')
    }
  }
  public removeValidators(form: FormGroup,str:any) {
    this.form.get(str)?.clearValidators();
    this.form.get(str)?.updateValueAndValidity();
  }
  authorization(){
  //send a post request with the table name and column to this endpoit in the backend to retrive all the distinct values in that column
  this.apiService.postFun('authorization',this.form2.value).subscribe(data => {
  // this.authData=data;//data variable holds all the data retrived then asign them to a variable cold value
  this.authData=""
  for (let i = 0; i < data.length; i++) {
    this.authData+=data[i]+" "
  }
  $('#liveToast').toast('show')
  $('.toast-body').html(this.authData)
  
  })
}
  imports(type:any){
    if (type=='CAPS') {
      this.apis=[
        {name:'getTaxDailyTotals'},
        {name:'getServiceChargeDailyTotals'},
        {name:'getDiscountDailyTotals'},
        {name:'getTenderMediaDimensions'},
        {name:'getTaxDimensions'},
        {name:'getMenuItemDimensions'},
        {name:'getGuestChecks'}
      ]
    }
    else
      this.apiService.getFun('interfaceCode').subscribe(data => {
        this.apis=data.apidata;//data variable holds all the data retrived then asign them to a variable cold value
        this.interfaces=data.interfacedata;//data variable holds all the data retrived then asign them to a variable cold value
      })
  } 
  start(connectionCode:any){
    this.apiService.postFun('startSun',{connectionCode}).subscribe(data => {
    this.reply=data;//data variable holds all the data retrived then asign them to a variable cold value
    //this.getmapp()//then call this function again to render the new submitted data
    })
  }
  
  stop(connectionCode:any){
    this.apiService.postFun('stopSun',{connectionCode}).subscribe(data => {
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
    let endpoint=""
    if (this.importType=='CAPS') 
      endpoint='capsImport'
    else
      endpoint='import'
    console.log(endpoint);
    console.log(this.interfaceCod,this.getDaysArray(start,end),this.form.get('api')?.value);
    for (let i = 0; i < this.getDaysArray(start,end).length; i++) {
      
      this.apiService.postFun(endpoint,{interface:this.interfaceCod,date:this.getDaysArray(start,end)[i].toISOString().split("T")[0],api:this.form.get('api')?.value}).subscribe(data => {
        this.x.push(data)
        if (this.x.length==this.getDaysArray(start,end).length) {
        }
        $('#liveToast').toast('show')
        $('.toast-body').text(data)
      })
    }
  }
  rows(event: any)
  {
    console.log((<HTMLInputElement>event.target).value);
  }
  importConnections(){
    this.DefinationCodes=[]
    this.apiService.getFun('getInterfaceDeinitionEdit').subscribe(data => {
     this.Combo=data
     console.log(this.Combo);
     
      })
  }
}