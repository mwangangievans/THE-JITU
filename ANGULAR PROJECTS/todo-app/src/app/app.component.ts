import { Target } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 loadedFeatures= 'recipe';
  constructor(){}
  onNavigate(Feature:string){
this.loadedFeatures = Feature;
  }
}
