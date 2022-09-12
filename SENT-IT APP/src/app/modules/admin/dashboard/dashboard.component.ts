import { Component, OnInit } from '@angular/core';
import { parcel_interface } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


// =======================================
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
