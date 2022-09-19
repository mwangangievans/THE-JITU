import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css']
})
export class CounterButtonComponent implements OnInit {

  constructor( private store :Store<{ counter:{counter:CounterState}}>) { }

  ngOnInit(): void {
  }

  OnIncrement(){

    this.store.dispatch(increment())
  }

  OnReset(){
    this.store.dispatch(reset())
  }

  OnDecrement(){
    this.store.dispatch(decrement())
  }
}
