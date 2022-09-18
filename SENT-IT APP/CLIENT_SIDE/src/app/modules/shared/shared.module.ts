import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { SuccessComponentComponent } from './success-component/success-component.component';



@NgModule({
  declarations: [
    ErrorComponentComponent,
    SuccessComponentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
