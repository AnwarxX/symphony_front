import { Component, OnInit } from '@angular/core';
import { APIsService } from '../services/apis.service';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.css']
})
export class StatusViewComponent implements OnInit {
  statData:any;
  constructor(public apiService:APIsService) {this.statusData()}

  ngOnInit(): void {
  }
  async statusData(){
    await this.apiService.getFun('statusData').subscribe(data => {
      this.statData=data
      console.log(data);
      
    })
  }
  async importFailed(api:any,date:any,interfaceCode:any){
    await this.apiService.postFun('import',{api,date,interface:interfaceCode}).subscribe(data => {
      this.statusData()
    })
  }
}
