import { Target } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  email  = '';
  button_status = false;
  my_text = '';
  text='';
  constructor(){
    setTimeout(() => {
      this.button_status=true;
    }, 2000);
  }

  somethingtyped(event : Event){
 this.my_text= (<HTMLInputElement>event.target).value;   

  }
}
