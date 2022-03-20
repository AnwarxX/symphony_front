import { Component, OnInit } from '@angular/core';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //add the  background to home id
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });

  }

}
