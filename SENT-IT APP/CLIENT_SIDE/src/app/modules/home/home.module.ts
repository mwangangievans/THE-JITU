import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroComponent } from './hero/hero.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ServicesComponent } from './services/services.component';
import { RouterModule } from '@angular/router';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Export this function
export function playerFactory(): any {
  return player;
}

@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    MainbodyComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,



    // RouterModule,
    [LottieModule.forRoot({ player: playerFactory })],

  ]
})
export class HomeModule { }
