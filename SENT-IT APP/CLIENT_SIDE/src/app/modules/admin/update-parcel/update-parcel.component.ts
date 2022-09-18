import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { parcel_interface } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';


@Component({
  selector: 'app-update-parcel',
  templateUrl: './update-parcel.component.html',
  styleUrls: ['./update-parcel.component.css']
})
export class UpdateParcelComponent implements OnInit {
  UpdatedData!:FormGroup
  isUpdating:boolean=false
  allParcels$!: Observable<parcel_interface>
  id:number = 0 ;


  constructor(private router:Router ,private route:ActivatedRoute ,private parcel_service:ParcelService ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.updateParcel()
    // console.log("update"+this.id);
  }


  updateParcel(){
    this.allParcels$ = this.parcel_service.getOneParcels(+this.id)
  }
}
