import { Component, OnInit } from '@angular/core';
import { parcel_interface, parcel_interface_response } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


// =======================================
allParcels: parcel_interface_response [] = [];
totalParcelCount! : number;
totalUserCount! : number;

filteredString:string='';

constructor( private parcel_service:ParcelService ,private user:AuthService) { }

ngOnInit(): void {
  console.log(this.filteredString);

  this.parcel_service.getAllParcels().subscribe(res=>{
    this.allParcels=res
  })
  this.totalUsers()
  this.totalParcels()
  this.getTotalRevenue()

}
totalParcels(){
  this.parcel_service.getAllParcels().subscribe(res=>{
    const  parcelCount = res.length;
    this.totalParcelCount = parcelCount
  })
}

getTotalRevenue(){
  // this.allParcels.forEach()
  for (let i = 0; i < this.allParcels.length; i++) {
    console.log(this.allParcels[i]);
}

}
totalUsers(){
  this.user.getAllUsers().subscribe(res=>{
    const  userCount = res.length;
    this.totalUserCount = userCount
  })
}
viewDetails(parcelNo:number): void {

    this.parcel_service.redirect('admin/See-More/'+parcelNo)
}
}
