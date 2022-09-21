import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { parcel_interface, parcel_interface_response } from 'src/app/interface/interface';
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
   allParcels$!: Observable<parcel_interface_response>
   markerOptions: google.maps.MarkerOptions = {draggable: false};
   markerPositions: google.maps.LatLngLiteral[] = [];
   logitude!:number
   latitude!:number



  constructor(private router:Router ,private route:ActivatedRoute ,private parcel_service:ParcelService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.allParcels$=this.parcel_service.getOneParcels(+this.id)
    this.allParcels$.subscribe(data=>{
      this.logitude=data.logitude
      this.latitude=data.latitude

      this.markerPositions.push({ lat: this.latitude , lng: this.logitude});

    }

    )
    console.log("obsavable........."+this.allParcels$);

  }
  display: any;
    center: google.maps.LatLngLiteral = {
      lat: 1.3836406165683048 , lng: 38.621918374999986
    };
    zoom = 6;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }


//  ===================================================update logic==========================
Update(id:number){
  console.log(id);
  this.router.navigate(['admin/update-Parcel/'+id])

}

updateParcel(){}
}
