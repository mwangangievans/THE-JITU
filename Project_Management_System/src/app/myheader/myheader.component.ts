import { Component, OnInit } from '@angular/core';
import {NavToggleService} from '../Services/nav-toggle.service'

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.css']
})
export class MyheaderComponent implements OnInit {

  constructor(public navToggleService: NavToggleService ) { }

  ngOnInit(): void {
 console.log(this.navToggleService.nav_button_clicked);
    
  }

  ToggleService(){
  this.navToggleService.toggleNavBar()
  console.log(this.navToggleService.nav_button_clicked);
  
  }

}
