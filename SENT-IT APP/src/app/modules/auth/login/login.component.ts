
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userLogin, userLoginInterface } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!:NgForm

   loginDetails:userLogin []=[
    {
    email:"evans@gmail.com",
    password:"12345",
    role:"admin"
  },
  {
    email:"user@gmail.com",
    password:"12345",
    role:"user"
  }
  ]


  userLogindetails!:userLogin

  constructor( private auth:AuthService , private router:Router) {
   }

  ngOnInit(): void {
const user =this.loginDetails.find(item=>{
  item.email === "evans@gmail.com";
 });

 console.log(user);
  }

  register(){

  }
  // login(loginData:userLoginInterface){

  // }
  onLogin(loginData:userLoginInterface){
    this.auth.loginAuthentication(loginData).subscribe(res=>{
      localStorage.setItem("token",res.token)
      console.log(res.message);

      this.checkRole()

    })
    setTimeout(() => {
    this.auth.checkUserRole()
   this.redirect()


    }, 500);
  }

  checkRole(){
    this.auth.checkUserRole().subscribe(res=>{
    console.log(res)

  })
  }
    onSign(signData:NgForm){
      console.log(signData);

    }

    redirect(){
      let role = localStorage.getItem('role')

      if ( role == 'user'){

        this.router.navigate(['admin']);

        localStorage.setItem('Logged', 'true')

      }else if(role == 'admin'){

        this.router.navigate(['admin']);
        localStorage.setItem('Logged', 'true')
      }
    }
}

