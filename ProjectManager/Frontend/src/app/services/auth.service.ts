import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { loginResponce, role, userLoginInterface } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  loginAuthentication(loginData:userLoginInterface):Observable<loginResponce>{

    this.checkUserRole()

    return this.http.post<loginResponce>('http://localhost:5000/user/login', loginData)
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
