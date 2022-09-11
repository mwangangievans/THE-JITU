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
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDetailDialogComponent } from './view-detail-dialog/view-detail-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { FilterPipe } from './filter.pipe';
import { UpdateParcelComponent } from './update-parcel/update-parcel.component';
// import { FilterPipe } from 'src/app/pipes/filter.pipe';
// import { AppModule } from 'src/app/app.module';






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

  ]
})
export class AdminModule { }
