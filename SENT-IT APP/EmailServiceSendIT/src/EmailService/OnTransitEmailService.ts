import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
import ejs from 'ejs'
dotenv.config()
import Connection from "../DatabaseHelpers/db";
const db = new Connection();
import sendMail from '../Helpers/Email'
interface IParcel{
    sender_name:string
    sender_email:string
    sender_phone:string
    receiver_name:string
    receiver_email:string
    Receiver_phone:string
    time_Dispatched:string
    destination:string
    parcel_no:string
    weight:string
    cost_per_kg:string
    total_cost:string
}


const OnTransitEmail= async()=>{
const pool = await mssql.connect(sqlConfig)
const parcels:IParcel[]= await (await db.exec("sent_dispatched_mails")).recordset

console.log(parcels);


 for(let parcel of parcels){

    ejs.renderFile('templates/OnTransitEmail.ejs',{senderName:parcel.sender_name,receiverName:parcel.receiver_name, deliveryDate:parcel.time_Dispatched,parcelDestination:parcel.destination} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:parcel.receiver_email,
            subject:"Your Parcel has been dispatched",
            html:data,
            attachments:[
                {
                    filename:'order.txt',
                    content:`Your  parcel is on transit from : ${parcel.sender_name}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await db.exec("reset_dispatched_notify", { parcel_no: parcel.parcel_no });
           
            console.log('On Transit Email Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })
    ejs.renderFile('templates/AdminOnTransitEmail.ejs',{senderName:parcel.sender_name,receiverName:parcel.receiver_name, deliveryDate:parcel.time_Dispatched,parcelDestination:parcel.destination} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:parcel.sender_email,
            subject:"Your Parcel is on Transit",
            html:data,
            attachments:[
                {
                    filename:'order.txt',
                    content:`Your order details for : ${parcel.receiver_name}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await db.exec("reset_dispatched_notify", { parcel_no: parcel.parcel_no }); 
            console.log(' dispatched Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default OnTransitEmail