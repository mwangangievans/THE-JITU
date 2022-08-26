import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 @Output() FeatureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(Feature:string){
    this.FeatureSelected.emit(Feature);
  }
}
