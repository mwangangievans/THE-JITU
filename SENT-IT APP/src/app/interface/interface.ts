export interface userLoginInterface {
  email:string;
  password:string;
}

export interface loginResponce {
  message:string;
  token:string
}
export interface parcelMessage{
  message:string
}

export interface role{
  name: string,
  role: string,
  email: string
}

export interface parcel_interface {
  parcel_no:number
  sender_id:string
  receiver_id:string
  origin:string
  destination:string
  Dispatch_time:string
  parcel_status:string
  Weight:string
  Charge:string
  parcel_description:string
}
export interface detailsDialog {
  animal: string;
  name: string;
}
