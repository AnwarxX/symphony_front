import { Component, OnInit } from '@angular/core';
import { APIsService } from '../services/apis.service';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements OnInit {
  statData:any;
  constructor(public apiService:APIsService) {
    this.statusData("")
  }
  
  ngOnInit(): void {
  }
  async statusData(date:any){
    this.apiService.postFun('statusData',{date:date}).subscribe(data => {
      this.statData = data;
    })
  }
  search(event:any){
    console.log((<HTMLInputElement>event.target).value);
    this.statusData((<HTMLInputElement>event.target).value)
}
  async importFailed(api:any,date:any,interfaceCode:any){
    this.apiService.postFun('import', { api,date: date.split("T")[0], interface: interfaceCode }).subscribe(data => {
      setTimeout(() => {
        this.statusData("")
      }, 2000);
    })
  }
}
