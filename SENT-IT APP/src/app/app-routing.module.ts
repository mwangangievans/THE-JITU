import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './modules/admin/header/header.component';
import { PageNotFoundComponent } from './modules/home/page-not-found/page-not-found.component';
import { AuthguardGuard } from './authguard.guard';


const routes: Routes = [
  {path:'',loadChildren:()=>import('./modules/home/home.module').then(mod=>mod.HomeModule)},
  {path:'auth',loadChildren:()=>import('./modules/auth/auth.module').then(mod=>mod.AuthModule)},
  {path:'admin',canActivate:[AuthguardGuard] ,loadChildren:()=>import('./modules/admin/admin.module').then(mod=>mod.AdminModule)},
  {path:'**',component:PageNotFoundComponent}
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
