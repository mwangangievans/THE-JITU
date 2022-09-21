export interface userLoginInterface {
  email:string;
  password:string;
}

export interface userRegister{
  phone:string;
  user_name:string;
  user_email:string;
  password?:string;
  user_id?:number

}

export interface registerResponse{
  message:string
}

export interface loginResponce {
  message:string;
  token:string
  name:string
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
  Cost: string
  Receiver: string
  Sender: string
  deliverde_notify: boolean
  destination: string
  dispatch_notify: boolean
  is_deleted: boolean
  is_delived: boolean
  is_dispatched: boolean
  lat: number
  logi: number
  parcel_no: number
  time_Dispatched: string
  weight: string
}
  // =======
export interface parcel_interface_response {
Receiver_phone:  string
cost_per_kg: string
destination: string
latitude:  number
logitude:  number
parcel_no:  number
receiver_email: string
receiver_name: string
sender_email: string
sender_name: string
sender_phone: string
time_Dispatched:string
total_cost:  number
weight: string
is_delived:boolean
is_dispatched:boolean
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
