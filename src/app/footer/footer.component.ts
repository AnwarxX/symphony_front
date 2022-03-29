import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //add the  background to home id
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });

  }

}
