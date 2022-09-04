import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';

import {LoginComponent} from './auth-module/login/login.component'
import {HeaderComponent} from './auth-module/header/header.component'
import {RegisterComponent} from './auth-module/register/register.component'
import {HomeComponent} from './auth-module/home/home.component';
import {UserModuleModule} from './user-module/user-module.module'


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent,
  children:[
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },  
] },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent

  ],
  imports: [
    UserModuleModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
