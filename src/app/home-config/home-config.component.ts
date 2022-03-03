import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-home-config',
  templateUrl: './home-config.component.html',
  styleUrls: ['./home-config.component.css']
})
export class HomeConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }

}


