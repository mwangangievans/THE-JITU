import { request, Request, RequestHandler, Response } from "express";
import { sqlConfig } from "../config/config.js";
import Connection from "../databaseHelper/DB";
const db = new Connection();

import dotenv from "dotenv";
dotenv.config();

import { Data, Parcel } from "../interface/interface.js";
import { string } from "joi";
import { ParcelSchema } from "../helpers/parcelValidation.js";

interface ExtendedRequest extends Request {
    body: {
        Cost: string
        Receiver: string
        Sender: string
        deliverde_notify: any
        destination: string
        dispatch_notify: any
        is_deleted: any
        is_delived: any
        is_dispatched: any
        lat: any
        logi: any
        parcel_no: any
        time_Dispatched: string
        weight: string
    }

}

export const createParcel = async (req: ExtendedRequest, res: Response) => {
    try {

        const {
            Cost, Receiver, Sender, deliverde_notify, destination, dispatch_notify,
            is_deleted, is_delived, is_dispatched, lat, logi, parcel_no, time_Dispatched, weight
        } = req.body;
        const { error, value } = ParcelSchema.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }

        const check_if_parcel_exist: Parcel[] = (
            await db.exec("get_single_parcel", { parcel_no })
        ).recordset;
        await db.exec("InsertUpdateParcel", { Cost, Receiver, Sender, deliverde_notify, destination, dispatch_notify, is_deleted, is_delived, is_dispatched, lat, logi, parcel_no, time_Dispatched, weight });

        if(check_if_parcel_exist.length===0){
            return res.json({ message: "Parcel successfully Created..." })
        }else{
            return res.json({ message: "Parcel successfully updated..." })

        }

    } catch (error: any) {
        res.json({ error })
    }

}

export const getSingleParcel: RequestHandler<{ id: string }> = async (
    req,
    res
  ) => {
    try {
      const parcel_no = req.params.id;
      
      const single_user: Parcel[] = (
          await db.exec("get_single_parcel",{parcel_no})
        ).recordset;
  
      if (single_user.length===0) {
        return res.json({ message: "Parcel not found!!" });
      } else {
  
       return res.json(single_user);
      }
    } catch (error: any) {
      res.json({ error });
    }
  };
  
//   export const deleteParcels: RequestHandler = async (req, res) => {
//     try {
//         const parcel_no = req.params.id;

//         const Parcels: Parcel[] = (
//             await db.exec("deleteParcel",{parcel_no})
//           ).recordset;

//         if (Parcels.length===0) {   
//             return  res.json({ message: "no Parcels in the database" });
//         }else{
//             return res.json(Parcels);

//         }
        
//       } catch (error) {
//         res.json({ error });
//       }
// }

export const delete_parcel:RequestHandler<{id:string}> = async (req , res ) =>{
    try {

        const parcel_no = req.params.id
        const single_user: Parcel[] = (
            await db.exec("get_single_parcel",{parcel_no})
          ).recordset;       
          
          if (single_user.length===0) {
         return res.json({ message: "Parcel with that id does not exist..." })
         }else{
            await db.exec("deleteParcel",{parcel_no})

           return  res.json({ message: "parcel successfully deleted...." })
         }
        
    } catch (error:any) {
        res.json({error})
        
    }
}



export const getAllParcels: RequestHandler = async (req, res) => {
    try {
        const Parcels: Parcel[] = (
            await db.exec("get_all_parcels")
          ).recordset;

        if (Parcels.length===0) {   
            return  res.json({ message: "no Parcels in the database" });
        }else{
            return res.json(Parcels);

        }
        
      } catch (error) {
        res.json({ error });
      }
}


