import express from 'express'
import cron from 'node-cron'
import WelcomeEmail from './EmailService/WelcomeEmailService'
import OnTransitEmail from './EmailService/OnTransitEmailService'
import DeliveredEmail from './EmailService/DeliveredEmail'
const app = express()

const run =()=>{
    cron.schedule('* * * * *', async()=>{
        console.log("delivered.....11");
        console.log('cron is running.....22');
        await WelcomeEmail()
        await OnTransitEmail()
        await DeliveredEmail()

    })
}
run()

app.listen(3000, ()=>{
    
    console.log('Email service is running.........................1');
    
})