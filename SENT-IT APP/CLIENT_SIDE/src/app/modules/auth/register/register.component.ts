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
  registerSuccess!:string
  registerError!:string

  formValue!:FormGroup
  constructor( private auth:AuthService , private router:Router) {

  }
  ngOnInit(): void {

  }

  onSign(registerData:userRegister){

    this.auth.registerUser(registerData).subscribe(res=>{
      this.registerSuccess = res.message
      this.router.navigate(['login']);


      setTimeout(() => {
        this.registerSuccess = "";
      }, 2000);

    },error=>{
      if(error.status === 409)
      this.registerSuccess = "";
      this.registerError = error.error.message
      console.log(this.registerError);

      setTimeout(() => {
        this.registerError = "";
      }, 2000);


    }
    )

  }
}
