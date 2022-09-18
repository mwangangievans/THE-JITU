import { Router } from "express";
import {registerUser ,getSingleUser , loginUser,getAllUsers,deleteUser,updateuser,checkUser} from "../Controllers/userController.js"
import {updateProject,delete_project,getAllProjects} from "../Controllers/projectController.js"
import {VerifyToken }from "../middleware/verifyToken.js"
import { createParcel, delete_parcel, getAllParcels, getSingleParcel } from "../Controllers/parcelController.js";

export const router = Router();

// auth routers
router.post('/login',loginUser)
router.post('/signup',registerUser)
router.get('/check-user',VerifyToken,checkUser)

// user routers
router.get('/all-users',getAllUsers)
router.get('/:id',getSingleUser)
router.put('/edit/:id',updateuser)
router.delete('/delete/:id' ,deleteUser)

// project routers

export const parcel_router = Router();

parcel_router.post('/create'  , createParcel)
parcel_router.get('/show/:id'  , getSingleParcel)
parcel_router.delete('/delete/:id' , delete_parcel)
parcel_router.get('/all-parcels',getAllParcels)





