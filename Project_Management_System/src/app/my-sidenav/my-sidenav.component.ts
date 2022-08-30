import { Component, OnInit } from '@angular/core';
import {NavToggleService} from '../Services/nav-toggle.service'
@Component({
  selector: 'app-my-sidenav',
  templateUrl: './my-sidenav.component.html',
  styleUrls: ['./my-sidenav.component.css']
})
export class MySidenavComponent implements OnInit {

  constructor(public navToggleService: NavToggleService ) { }

  ngOnInit(): void {
  }

}
