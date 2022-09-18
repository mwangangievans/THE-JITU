import { Pipe, PipeTransform } from '@angular/core';
import { parcel_interface } from 'src/app/interface/interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: parcel_interface[],filteredString:string){
    if(value.length === 0 || filteredString==='')
    return value;

  const  Parcels = [];
    for ( const parcel of value){
     if(parcel.sender_id.toLowerCase().indexOf(filteredString.toLocaleLowerCase())!==-1){
      Parcels.push(parcel)
     }
    }
    return Parcels;
  }


}
