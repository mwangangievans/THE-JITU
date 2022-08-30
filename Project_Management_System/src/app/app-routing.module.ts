import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { HomeComponent } from './home/home.component';
import {UsersComponent} from '../app/users/users.component';
import {ProjectsComponent} from '../app/projects/projects.component'


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
