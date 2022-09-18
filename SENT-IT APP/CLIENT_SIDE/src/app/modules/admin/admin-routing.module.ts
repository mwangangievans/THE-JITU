import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PercelsComponent } from './percels/percels.component';
import { RevenueComponent } from './revenue/revenue.component';
import { UpdateParcelComponent } from './update-parcel/update-parcel.component';
import { UserComponent } from './user/user.component';
import { ViewDetailDialogComponent } from './view-detail-dialog/view-detail-dialog.component';


const routes: Routes = [
  {path:'',component:HeaderComponent, children:[
  {path:'',component:DashboardComponent},
  {path:'users',component:UserComponent},
  {path:'Percels',component:PercelsComponent},
  {path:'Revenue',component:RevenueComponent},
  {path:'New-parcel',component:AddParcelComponent},
  {path:'See-More/:id',component:ViewDetailDialogComponent},
  {path:'update-Parcel/:id',component:UpdateParcelComponent},


  ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
