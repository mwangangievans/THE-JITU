import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { loginResponce, registerResponse, role, userLogin, userLoginInterface, userRegister } from '../interface/interface';

export interface token{
  token:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginIn(){
    return !!localStorage.getItem('token') as boolean
  }
  loginAuthentication(loginData:userLoginInterface):Observable<loginResponce>{
    this.checkUserRole()
    return this.http.post<loginResponce>('http://localhost:5000/user/login', loginData)
  }

  registerUser(registerData:userRegister):Observable<registerResponse>{
    // this.checkUserRole()
    return this.http.post<registerResponse>('http://localhost:3000/Users', registerData)
  }

  getAllUsers():Observable<userRegister[]>{
    return this.http.get<userRegister[]>('http://localhost:3000/Users')
  }
  checkUserRole(){
    let token = localStorage.getItem('token') as string
    return this.http.get<role>('http://localhost:5000/user/check-user',{
      headers: new HttpHeaders({
        "token": token
      })
    }).pipe(map((res)=>{
      localStorage.setItem('role', res.role)
      localStorage.setItem('Name', res.name)
    return res.role
  }))
  }

}
