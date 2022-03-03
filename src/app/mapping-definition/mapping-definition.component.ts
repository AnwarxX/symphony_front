import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any //declear $ to use jquery

@Component({
  selector: 'app-mapping-definition',
  templateUrl: './mapping-definition.component.html',
  styleUrls: ['./mapping-definition.component.css']
})
export class MappingDefinitionComponent implements OnInit {
 //this is the form group that contains all the property setting inputs with its validation
 form2 = new FormGroup({
  Code:new FormControl("",Validators.compose([Validators.required])),
  Description:new FormControl("",Validators.compose([Validators.required])),
})
value:any;
  constructor(public httpClient:HttpClient) { }

  ngOnInit(): void {
    $('#home').particleground({
      dotColor: 'cadetblue',
      lineColor: 'white'
  });
  }

}
