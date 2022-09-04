import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
        RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports:[
    
    RegisterComponent,
    // HeaderComponent,
    // HomeComponent,
    
  ]
})
export class AuthModuleModule { }
