import { Injectable } from '@angular/core';
import  { CanActivate,Router} from '@angular/router'
import { AuthService } from './services/auth.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private _router:Router ,private _authService:AuthService){

  }
  canActivate(): boolean {
    if(this._authService.loginIn()){
      return true
    }else{
      this._router.navigate(['/login'])
      return false
    }
  }

}
