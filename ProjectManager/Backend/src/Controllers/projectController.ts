import { request, Request, RequestHandler, Response } from "express";
import mssql, { pool } from 'mssql'
import { sqlConfig } from "../config/config.js";
import { v4 as uid } from 'uuid';
import { ProjectSchema } from '../helpers/userValidation.js'
import { Project } from '../interface/interface.js'
import jwt from 'jsonwebtoken'

import { Data } from '../interface/interface.js'
import { string } from "joi";

import dotenv from 'dotenv'
dotenv.config()

interface ExtendedRequest extends Request {
    body: {
        project_name:string
        project_description:string
        completion_date:Date
    }
}

export const  createProject = async (req:ExtendedRequest ,res:Response) =>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const id = uid()
        const {project_name,project_description,completion_date} = req.body
        const { error , value } = ProjectSchema.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
        await pool.request()
        .input('project_id' , mssql.VarChar , id)
        .input('Assigned_to', mssql.VarChar ,"0a059010-7a1b-4309-b895-2fc535751959")
        .input('project_name', mssql.VarChar ,project_name)
        .input('project_description', mssql.VarChar ,project_description)
        .input('completion_date', mssql.DateTime,completion_date)
        .input('Is_completed', mssql.Bit ,false)
        .execute('create_project')

        res.json({message:"project successfully registered..."})

    } catch (error:any) {
        res.json({error})
    }
    
}

export const updateProject:RequestHandler<{id:string}> = async ( req , res) =>{
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const {project_name, project_description ,completion_date} = req.body as {
            project_name:string
            project_description:string
            completion_date:string
        }
        const project_to_update = await pool.request().input('id', mssql.VarChar, id).execute('get_single_project')
        if (!project_to_update.recordset[0]) {
            return res.json({ message: "Project with that id does not exist..." })
        }
        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('name', mssql.VarChar, project_name)
            .input('description', mssql.VarChar, project_description)
            .input('date', mssql.Date, completion_date)
            .execute('updateProject')

        res.json({ message: "user successfully updated....." })
        
    } catch (error:any) {
        res.json({error})
        
    }
   
}

export const delete_project:RequestHandler<{id:string}> = async (req , res ) =>{
    try {

        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const project_to_update = await pool.request().input('id', mssql.VarChar, id).execute('get_single_project')
        if (!project_to_update.recordset[0]) {
         return res.json({ message: "Project with that id does not exist..." })
         }else{
            await pool.request().input('id', mssql.VarChar, id).execute('deleteProject');
            res.json({ message: "project successfully deleted...." })
         }
        
    } catch (error:any) {
        res.json({error})
        
    }
}

// get all projects in the database
export const getAllProjects: RequestHandler = async (req, res) => {
    try {
         console.log("gettiong... the projects...........");

        const pool = await mssql.connect(sqlConfig)
        const projects = await pool.request().execute('get_all_Projects')
        // console.log(projects);
        
        if (!projects.recordset[0]) {
        return   res.json({ message: "You have no Projects available" })
        }
        const { recordset } = projects
           return   res.json( recordset)

    } catch (error) {
      return  res.json({ error })
    }
}

