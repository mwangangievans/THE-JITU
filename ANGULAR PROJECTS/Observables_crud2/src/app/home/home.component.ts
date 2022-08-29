import { Component, OnDestroy, OnInit } from '@angular/core';
import { count } from 'console';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  private fisrtObsSubscription : Subscription
  constructor() { }

  ngOnInit() {
    const customIntervalObservable =  new Observable(observer=>{
      let count = 0;
      setInterval(() => {
      observer.next(count)
      count++
    }, 100);
    });
    this.fisrtObsSubscription= customIntervalObservable.subscribe(data=>{
      console.log(data);
      
    })
  }
  ngOnDestroy(): void {
    this.fisrtObsSubscription.unsubscribe();
  }
}
