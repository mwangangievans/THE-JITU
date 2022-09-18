import { number } from "joi"
import { Money } from "mssql"

export interface  User
{
    user_id:string
    user_email:string
    hashedpassword:string
    user_role:string
    user_name:string
}

export interface  Data
{
    user_id: string,
    user_email: string,
    user_name:string,
    user_role:string
    iat: number,
    exp: number
}

export interface  Parcel
{
    Cost: string
    Receiver: string
    Sender:string
    deliverde_notify:boolean 
    destination:string
    dispatch_notify:boolean
    is_deleted:boolean
    is_delived:boolean
    is_dispatched:boolean
    lat:number
    logi:number
    parcel_no:number
    time_Dispatched:string
    weight:string
}