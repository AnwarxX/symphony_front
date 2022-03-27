import { Component, OnInit } from '@angular/core';
import { APIsService } from "../services/apis.service";
import * as cryptoJS from 'crypto-js';
declare var $:any //declear $ to use jquery


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public apiService:APIsService) { }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }
}
