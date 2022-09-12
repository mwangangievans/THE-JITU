import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css']
})
export class CounterButtonComponent implements OnInit {

  @Output() increment = new EventEmitter<void>()
  @Output() decrement = new EventEmitter<void>()
  @Output() reset = new EventEmitter<void>()


  constructor() { }

  ngOnInit(): void {
  }

  OnIncrement(){
    this.increment.emit();
  }

  OnReset(){
    this.reset.emit()
  }

  OnDecrement(){
     this.decrement.emit()
  }
}
