import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child-co',
  templateUrl: './child-co.component.html',
  styleUrls: ['./child-co.component.css']
})
export class ChildCoComponent implements OnInit {
  @Input() count!: number;

  @Output() parantCounter=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  addCounter(){
    this.count++
    this.parantCounter.emit(this.count);
  }
  minusCounter(){
  this.count--;
  this.parantCounter.emit(this.count)
  }

}
