import { Component, OnInit } from '@angular/core';
import { APIsService } from '../services/apis.service';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})

export class StatusViewComponent implements OnInit {
  statData:any;
  input:any;
  constructor(public apiService:APIsService) {
    this.statusData("")
  }
  
  ngOnInit(): void {
  }
  async statusData(date:any){
    this.apiService.postFun('statusData',{date:date}).subscribe(data => {
      console.log(data);
      this.statData = data;
    })
  }
  search(event:any){
    this.input=(<HTMLInputElement>event.target).value;
    this.statusData((<HTMLInputElement>event.target).value)
}
  async importFailed(row:any){
    let endpoint;
    if (row.ApiName.includes('caps')) {
      endpoint='capsImport'
    }
    else{
      endpoint='import'
    }    
    this.apiService.postFun(endpoint, { api:row.ApiName.split('-')[0],date: row.Date.split("T")[0], interface: row.interfaceCode }).subscribe(data => {
      // setTimeout(() => {
        this.statusData(this.input)
      // }, 2000);
      console.log(data);
      $('#liveToast').toast('show')
      $('.toast-body').text(data)
    })
  }
}
