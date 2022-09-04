import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!:NgForm

  name!:string
  password!:string

  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

    console.log(this.loginForm);
    

  }
  

}
