import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { parcelMessage, parcel_interface } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(private http: HttpClient,private router:Router,private route:ActivatedRoute) { }
  addParcel(parcelData:parcel_interface):Observable<parcelMessage>{
    console.log(parcelData);
    return this.http.post<parcelMessage>('http://localhost:3000/Parcels', parcelData)
  }

  getAllParcels():Observable<parcel_interface[]>{
    return this.http.get<parcel_interface[]>('http://localhost:3000/Parcels')
  }

  getOneParcels(id:number):Observable<parcel_interface>{
    return this.http.get<parcel_interface>('http://localhost:3000/Parcels/'+id)
  }
  redirect(url:string){
    this.router.navigate([url]);
  }



}
