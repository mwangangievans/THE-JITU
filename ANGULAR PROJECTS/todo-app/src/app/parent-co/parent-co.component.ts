import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-co',
  templateUrl: './parent-co.component.html',
  styleUrls: ['./parent-co.component.css']
})
export class ParentCoComponent implements OnInit {
Counter : number= 5;
  constructor() { }

  ngOnInit(): void {
  }

  addCounter(){
    this.Counter++
  }

  minusCounter(){
    this.Counter--
  }
}
