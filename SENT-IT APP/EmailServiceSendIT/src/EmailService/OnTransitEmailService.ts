import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
import ejs from 'ejs'
dotenv.config()
import Connection from "../DatabaseHelpers/db";
const db = new Connection();
import sendMail from '../Helpers/Email'
interface IParcel{
    id:string,
    senderName:string
    receiverName:string
    senderEmail:string
    receiverEmail:string
    origin:string
    destination:string
    dispatchedDate:string
    deliveryDate:string
    weight:string
    price:string
}


const OnTransitEmail= async()=>{
const pool = await mssql.connect(sqlConfig)
const parcels:IParcel[]= await (await db.exec("transitEmail")).recordset

console.log(parcels);


 for(let parcel of parcels){

    ejs.renderFile('templates/OnTransitEmail.ejs',{senderName:parcel.senderName,receiverName:parcel.receiverName,parcelOrigin:parcel.origin, deliveryDate:parcel.deliveryDate,parcelDestination:parcel.destination} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:parcel.receiverEmail,
            subject:"Your Parcel is on Transit",
            html:data,
            attachments:[
                {
                    filename:'order.txt',
                    content:`You have a parcel on transit from : ${parcel.senderName}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await db.exec("resettransitEmail", { id: parcel.id });
           
            console.log('On Transit Email Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })
    ejs.renderFile('templates/AdminOnTransitEmail.ejs',{senderName:parcel.senderName,receiverName:parcel.receiverName,parcelOrigin:parcel.origin, deliveryDate:parcel.deliveryDate,parcelDestination:parcel.destination} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:parcel.senderEmail,
            subject:"Your Parcel is on Transit",
            html:data,
            attachments:[
                {
                    filename:'order.txt',
                    content:`Your order details for : ${parcel.receiverName}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            
            console.log('Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default OnTransitEmail