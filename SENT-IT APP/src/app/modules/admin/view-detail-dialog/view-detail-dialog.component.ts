import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { parcel_interface } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: ['./view-detail-dialog.component.css']
})


export class ViewDetailDialogComponent implements OnInit {
   id:number = 0 ;
   allParcels: parcel_interface [] = [];
  constructor(private route:ActivatedRoute ,private parcel_service:ParcelService ) { }

  ngOnInit(): void {
   const array1 = this.parcel_service.getAllParcels().subscribe(res=>{
      //  res.filter(item=>{item.parcel_no===this.route.snapshot.params['id']})
      res.filter(item=>{
        console.log(item.parcel_no);
      })
   })

   console.log(array1);
  //  this.id = this.parcel_service.showParcelDetails()
  }

}
