import express, { NextFunction, Request, Response } from 'express';
import cron from 'node-cron'
import SendAssignedEmails from './EmailService/AssignmentEmailService';



const app= express()

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({Error:err.message})
})
const run=()=>{
    cron.schedule('*/5 * * * * *', async()  => {
        console.log('running a task every 5 seconds');
        await SendAssignedEmails()
    });

   
     

}
run()


app.listen(4003,()=>{
    console.log("App is running");
    
})