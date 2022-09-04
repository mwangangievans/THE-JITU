import { json, Router } from "express";
import express  from "express";
import {router,project_router } from "./Routers/router.js"
import cors from 'cors'
import {VerifyToken} from "./middleware/verifyToken.js"


const app = express();

app.use(json());
app.use(cors())
app.use('/user' , router)
app.use('/project', project_router)

app.listen(5000 , ()=>{
  console.log("server is running");
});
