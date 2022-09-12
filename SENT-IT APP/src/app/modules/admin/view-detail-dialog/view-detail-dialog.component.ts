import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { parcel_interface } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: ['./view-detail-dialog.component.css']
})


export class ViewDetailDialogComponent implements OnInit {
   id:number = 0 ;
   isUpdating:boolean=false
   allParcels$!: Observable<parcel_interface>
  constructor(private router:Router ,private route:ActivatedRoute ,private parcel_service:ParcelService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log("parcel_no to details"+this.id);
    this.parcelDetails()
  }

  parcelDetails(){
     this.allParcels$ = this.parcel_service.getOneParcels(+this.id)
  }

//  ===================================================update logic==========================
Update(id:number){
  console.log(id);
  this.router.navigate(['admin/update-Parcel/'+id])

}

updateParcel(){}
}
