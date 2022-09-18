export interface userLoginInterface {
  email:string;
  password:string;
}

export interface userRegister{
  phone:string;
  user_name:string;
  user_email:string;
  password:string;
  user_id?:number

}

export interface registerResponse{
  message:string
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
  id:number
}
export interface detailsDialog  {
  animal: string;
  name: string;
}

export  interface  userLogin {
  email:string
  password:string
  role?:string
}
