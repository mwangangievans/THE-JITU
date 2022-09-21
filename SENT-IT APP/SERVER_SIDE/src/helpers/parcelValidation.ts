import Joi from "joi";

export const ParcelSchema = Joi.object(
    {
        //  Cost: Joi.string().required(),
        //  Receiver: Joi.string().required(),
        //  Sender:Joi.string().required(),
        //  deliverde_notify:Joi.boolean().required(), 
        //  destination:Joi.string().required(),
        //  dispatch_notify:Joi.boolean().required(),
        //  is_deleted:Joi.boolean().required(),
        //  is_delived:Joi.boolean().required(),
        //  is_dispatched:Joi.boolean().required(),
        //  lat:Joi.required(),
        //  logi:Joi.required(),
        //  parcel_no:Joi.number().required(),
        //  time_Dispatched:Joi.string().required(),
        //  weight:Joi.string().required(),  
         
         Cost:  Joi.string().required(),
         Receiver: Joi.string().required(),
         Sender: Joi.string().required(),
         deliverde_notify: Joi.boolean().required(),
         destination: Joi.string().required(),
         dispatch_notify: Joi.boolean().required(),
         is_deleted: Joi.boolean().required(),
         is_delived: Joi.boolean().required(),
         is_dispatched: Joi.boolean().required(),
         lat: Joi.number().required(),
         logi: Joi.number().required(),
         parcel_no: Joi.number().required(),
         time_Dispatched: Joi.string().required(),
         weight: Joi.string().required(),
    }
)