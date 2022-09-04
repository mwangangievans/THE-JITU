import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Routes} from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  // {path:'', redirectTo:'login', pathMatch:'full'},
  // {path:'login', component: LoginComponent},
  // {path:'admin',loadChildren:()=>import('./modules/admin/admin.module')
  // .then(item=>item.AdminModule)},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home',loadChildren:()=>import('./modules/auth/auth.module')
    .then(mod=>mod.AuthModule)},
  {path:'admin', loadChildren:()=>import('./modules/admin/admin.module')
    .then(mod=>mod.AdminModule)}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
