import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  formValue!:FormGroup



  parcel_status :string[]= ['cancelled','dispatched','delivered']
  constructor( private formbuider:FormBuilder, private parcel_auth:ParcelService ) { }

  ngOnInit(): void
   {
    this.formValue = this.formbuider.group({
    'parcel_no': Math.floor(Math.random() * 1000000000),
    'sender_id': this.formbuider.control('', Validators.required),
    'receiver_id': this.formbuider.control('', Validators.required),
    'origin': this.formbuider.control('', Validators.required),
    'destination': this.formbuider.control('', Validators.required),
    'Dispatch_time': this.formbuider.control('', Validators.required),
    'parcel_status': this.formbuider.control('', Validators.required),
    'Weight': this.formbuider.control('', Validators.required),
    'Charge': this.formbuider.control('', Validators.required),
    'parcel_description': this.formbuider.control('', Validators.required)
  });
 }


  handleSubmit(){
    if (this.formValue.valid) {
    this.parcel_auth.addParcel(this.formValue.value).subscribe(res=>{
    })
    setTimeout(() => {
      this.parcel_auth.redirect('admin/Percels')
       }, 500);
    }

  }


}
