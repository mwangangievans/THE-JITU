import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavToggleService {
nav_button_clicked = false;
  constructor() { }

  toggleNavBar(){
    this.nav_button_clicked = true;
    return this.nav_button_clicked;
  }
  unToggleNavBar(){
    this.nav_button_clicked = false;
    return this.nav_button_clicked;
  }

}
