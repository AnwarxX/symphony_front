import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { interval } from 'rxjs';
import * as cryptoJS from 'crypto-js';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  remainingTime:any;
  showTimer=true
  constructor(private router: Router) {
    this.timeCounter()
    interval(1000).subscribe((ev)=>{
      this.timeCounter()
    })   }

  ngOnInit(): void {
    //add the  background to home id
  //   $('#home').particleground({
  //     dotColor: 'cadetblue',
  //     lineColor: 'white'
  // });

  }
  
  timeCounter(){
    try {
      let tok =  localStorage.getItem('token');
      var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
      var originalText = bytes.toString(cryptoJS.enc.Utf8);
      if(originalText.includes("EndDate")){
        this.showTimer=true
        let data=JSON.parse(originalText)
        var seconds = Math.floor((new Date(data[0].EndDate).getTime() - (new Date().getTime()))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
    
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        this.remainingTime=days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
      }
      else
      {
        this.showTimer=false
      }
    } catch (error:any) {
      console.log(error.message);
    }
  }
}
