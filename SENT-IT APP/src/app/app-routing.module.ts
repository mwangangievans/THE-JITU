import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './modules/admin/header/header.component';


const routes: Routes = [
  // {path:'admin',component:HeaderComponent},
  {path:'',loadChildren:()=>import('./modules/home/home.module').then(mod=>mod.HomeModule)},
  {path:'auth',loadChildren:()=>import('./modules/auth/auth.module').then(mod=>mod.AuthModule)},
  {path:'admin',loadChildren:()=>import('./modules/admin/admin.module').then(mod=>mod.AdminModule)}


];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }