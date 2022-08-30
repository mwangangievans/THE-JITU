import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MySidenavComponent } from './my-sidenav/my-sidenav.component';
import { MyheaderComponent } from './myheader/myheader.component';
import { RouterModule } from '@angular/router';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';


@NgModule({
  declarations: [
    AppComponent,
    MySidenavComponent,
    MyheaderComponent,
    MydashboardComponent,
    HomeComponent,
    UsersComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
