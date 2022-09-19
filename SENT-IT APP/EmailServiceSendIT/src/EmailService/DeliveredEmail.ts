import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/Config'
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


const DeliveredEmail= async()=>{
const pool = await mssql.connect(sqlConfig)

console.log("delivered.....");

const parcels:IParcel[]= await (await db.exec("sent_delivered_mails")).recordset
console.log(parcels);

 for(let parcel of parcels){

    ejs.renderFile('templates/DeliveredEmail.ejs',{senderName:parcel.sender_name,receiverName:parcel.receiver_name,parcelOrigin:parcel.destination, deliveryDate:parcel.time_Dispatched,parcelDestination:parcel.destination}
     ,async(error:any,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:parcel.receiver_email,
            subject:"Your Parcel Has Been Delivered",
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                    content:`Order summary for a package from : ${parcel.sender_name}`
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await db.exec("reset_delivered_notify", { parcel_no: parcel.parcel_no }); 
            console.log('Delivered Email is Sent');
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}

export default DeliveredEmail