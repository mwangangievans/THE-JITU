import { Router } from "express";
import {registerUser ,getSingleUser , loginUser,getAllUsers,deleteUser,checkUser, updateuser} from "../Controllers/userController.js"
import {VerifyToken }from "../middleware/verifyToken.js"
import { createParcel, delete_parcel, getAllParcels, getSingleParcel } from "../Controllers/parcelController.js";

export const router = Router();

// auth routers
router.post('/login',loginUser)
router.post('/signup',registerUser)
router.get('/check-user',VerifyToken,checkUser)

// user routers
router.get('/all-users',VerifyToken,getAllUsers)
router.get('/:id',VerifyToken,getSingleUser)
router.put('/edit/:id',VerifyToken,updateuser)
router.delete('/delete/:id' ,VerifyToken,deleteUser)

// project routers

export const parcel_router = Router();

parcel_router.post('/create'  ,VerifyToken, createParcel)
parcel_router.get('/show/:id'  , getSingleParcel)
parcel_router.delete('/delete/:id' ,VerifyToken, delete_parcel)
parcel_router.get('/all-parcels',VerifyToken,getAllParcels)





