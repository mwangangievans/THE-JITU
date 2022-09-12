import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerResponse, userRegister } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerMessage!:registerResponse
  formValue!:FormGroup
  constructor( private auth:AuthService , private router:Router) {

  }
  ngOnInit(): void {
  }

  onSign(registerData:userRegister){

    this.auth.registerUser(registerData).subscribe(res=>{
      this.registerMessage = res
    })
    console.log(this.registerMessage);

  }
}
