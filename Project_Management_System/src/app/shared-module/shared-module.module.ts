import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectsComponent} from './projects/projects.component';
import {HomeComponent} from '../home/home.component';
import {MySidenavComponent} from '../my-sidenav/my-sidenav.component';
import {MydashboardComponent} from './mydashboard/mydashboard.component';
import {MyheaderComponent} from './myheader/myheader.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[ProjectsComponent,
    HomeComponent,
    MySidenavComponent,
    MydashboardComponent,
    MyheaderComponent

  ]
})
export class SharedModuleModule { }
