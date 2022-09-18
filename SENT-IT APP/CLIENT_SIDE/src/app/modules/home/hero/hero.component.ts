
import { Component, OnInit } from '@angular/core';
import {  AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  options: AnimationOptions = {
    path: '/assets/lottie/bikeanimation.json',
  };
  options1: AnimationOptions = {
    path: '/assets/lottie/bike.json'
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
