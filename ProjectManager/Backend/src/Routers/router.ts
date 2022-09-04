import { Router } from "express";
import {registerUser ,getSingleUser , loginUser,getAllUsers,deleteUser,updateuser,checkUser} from "../Controllers/userController.js"
import {createProject,updateProject,delete_project,getAllProjects} from "../Controllers/projectController.js"
import {VerifyToken }from "../middleware/verifyToken.js"

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

export const project_router = Router();

project_router.post('/create'  , createProject)
project_router.patch('/edit/:id'  , updateProject)
project_router.delete('/delete/:id' , delete_project)
project_router.get('/all-projects',getAllProjects)





