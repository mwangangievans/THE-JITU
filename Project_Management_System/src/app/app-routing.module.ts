import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserModuleModule} from './user-module/user-module.module';
import {MydashboardComponent} from './shared-module/mydashboard/mydashboard.component';
import {UsersComponent} from './user-module/user-module.module'

const routers: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'dashboard',  component: MydashboardComponent } ,
  { path: 'users',  component: UsersComponent } ,
  { path: 'projects',  component: ProjectsComponent } 



];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
