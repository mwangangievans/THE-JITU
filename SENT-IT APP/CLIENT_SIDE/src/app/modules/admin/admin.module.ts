import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { PercelsComponent } from './percels/percels.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDetailDialogComponent } from './view-detail-dialog/view-detail-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { FilterPipe } from './filter.pipe';
import { UpdateParcelComponent } from './update-parcel/update-parcel.component';
// import { FilterPipe } from 'src/app/pipes/filter.pipe';
// import { AppModule } from 'src/app/app.module';

import { GoogleMapsModule } from '@angular/google-maps'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
        HeaderComponent,
        DashboardComponent,
        UserComponent,
        PercelsComponent,
        RevenueComponent,
        AddParcelComponent,
        ViewDetailDialogComponent,
        FilterPipe,
        UpdateParcelComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    GoogleMapsModule,
    GooglePlaceModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule

  ]
})
export class AdminModule { }
