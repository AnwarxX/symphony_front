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
  reply:any;
  x:any;
  interfaces:any;
  apis:any;
  interfaceData:any;
  interfaceCod:any;
  rowInput:any;
  dateDisable=false
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
    console.log(this.interfaceCod);
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
  confirmDelete(){
    this.httpClient.post<any>('http://localhost:5000/deleteInterface',this.rowInput).subscribe(data => {
      console.log(data);
      this.getInterfaceData()
    })
  }
  disableDate(event:any){
    console.log((<HTMLInputElement>event.target).value);
    if((<HTMLInputElement>event.target).value.includes("Daily")||(<HTMLInputElement>event.target).value=="getGuestChecks"){
      this.dateDisable=true;
    }
    else{
      this.dateDisable=false;
    }
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
