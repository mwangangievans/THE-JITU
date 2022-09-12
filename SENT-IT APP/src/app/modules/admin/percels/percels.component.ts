import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { count, map } from 'rxjs';
import { parcel_interface } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';

@Component({
  selector: 'app-percels',
  templateUrl: './percels.component.html',
  styleUrls: ['./percels.component.css']
})
export class PercelsComponent implements OnInit {

  allParcels: parcel_interface [] = [];
  totalParcelCount! : number;
  filteredString:string='';

  constructor( private parcel_service:ParcelService ) { }

  ngOnInit(): void {
    console.log(this.filteredString);

    this.parcel_service.getAllParcels().subscribe(res=>{
      this.allParcels=res
    })
    this.totalParcels()


  }



  totalParcels(){
    this.parcel_service.getAllParcels().subscribe(res=>{
      const  parcelCount = res.length;
      this.totalParcelCount = parcelCount
    })
  }
  viewDetails(parcelNo:number): void {

      this.parcel_service.redirect('admin/See-More/'+parcelNo)
  }
}
