import { Component, OnInit } from '@angular/core';
import * as  AOS from "aos";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(  ): void {

    AOS.init();
  }

}
