import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-co',
  templateUrl: './child-co.component.html',
  styleUrls: ['./child-co.component.css']
})
export class ChildCoComponent implements OnInit {
  @Input() count!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
