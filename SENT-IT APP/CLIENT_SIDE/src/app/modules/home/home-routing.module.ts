import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
// import { AuthModule } from '../auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
// import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {path:'',component:HeaderComponent, children:[
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HeroComponent},
  {path:'login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'services',component:ServicesComponent},
  ]
  }

];

@NgModule({
  imports:
   [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
