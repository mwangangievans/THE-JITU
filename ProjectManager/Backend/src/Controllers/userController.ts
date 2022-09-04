import { request, Request, RequestHandler, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../config/config.js";
import { v4 as uid } from 'uuid';
import bcrypt from 'bcrypt';
import { UserSchema, UserSchema2 } from '../helpers/userValidation.js'
import { User } from '../interface/interface.js'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import { Data } from '../interface/interface.js'
import { string } from "joi";

interface Extended extends Request {
    info?: Data
}

interface ExtendedRequest extends Request {
    body: {
        email: string
        password: string
        name?: string
    }
}
export const registerUser = async (req: ExtendedRequest, res: Response) => {
    try {        
        const pool = await mssql.connect(sqlConfig)

        const id = uid()

        const { email, password, name } = req.body
        const { error, value } = UserSchema.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }

        const check_if_user_exist: User[] = await (await pool.request().input('user_email', mssql.VarChar, email).execute('check_user_if_exist')).recordset


        if (check_if_user_exist[0]) {
            return res.json({ userExist: 'user with that email already exist' ,})
        }else{
            const hashedpassword = await bcrypt.hash(password, 10)
            await pool.request()
                .input('user_id', mssql.VarChar, id)
                .input('user_email', mssql.VarChar, email)
                .input('user_role', mssql.VarChar, 'user')
                .input('user_name', mssql.VarChar, name)
                .input('Is_assigned', mssql.Bit ,false)
                .input('user_password', mssql.VarChar, hashedpassword)
                .execute('insert_User')
    
            res.json({ registerSuccess: 'Registered...Redirecting to login page....' })
        }

        
    } catch (error) {
      return  res.json({ error })
    }

}

export const loginUser = async (req: ExtendedRequest, res: Response) => {
    try {
        
        const pool = await mssql.connect(sqlConfig);
        const { email, password } = req.body;
        
        const { error, value } = UserSchema2.validate(req.body);
        if (error) {
            res.json({ Error: error.details[0].message })
        }

        const user_exist: User[] = await (await pool.request().input('user_email', mssql.VarChar, email).execute('check_user_if_exist')).recordset
            
        if (!user_exist[0]) {
            return res.json({ message: 'User Not found' })

        }
        const valid_password = await bcrypt.compare(password, user_exist[0].user_password)
        
        if (!valid_password) {
            res.json({ message: "invalid password..." })
        }

        const payload = user_exist.map((item) => {
            const { user_password, ...rest } = item
            return rest;
        })
        //, { expiresIn: '3600s' }

        const token = jwt.sign(payload[0], process.env.key as string )
        return res.json({message: "you are logged in",token:token})

    } catch (error: any) {
        console.log(error);
    }
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try {

        const pool = await mssql.connect(sqlConfig)
        const users = await pool.request().execute('get_all_users')
        if (!users) {
            res.json({ message: "no users in the database" })
        }
        const { recordset } = users
        return   res.json( recordset)

    } catch (error) {
        res.json({ error })
    }
}

export const getSingleUser: RequestHandler<{ id: string }> = async (req, res) => {
    try {

        const id = req.params.id;

        const pool = await mssql.connect(sqlConfig)

        const single_user = await pool.request().input('id', mssql.VarChar, id).execute('get_single_user')

        const { recordset } = single_user
        if (!single_user.recordset[0]) {
            res.json({ message: "user not found!!" })
        } else {

            console.log(recordset);

            res.json(recordset)
        }

    } catch (error: any) {
        res.json({ error })
    }
}

export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)

        const delete_user = await pool.request().input('id', mssql.VarChar, id).execute('get_single_user')
        if (!delete_user.recordset[0]) {
            res.json({ message: "user with that id does not exist..." })
        } else {
            await pool.request().input('id', mssql.VarChar, id).execute('deleteUser');
            res.json({ message: "user successfully deleted...." })
        }

    } catch (error: any) {
        res.json({ error })
    }
}

export const updateuser: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)

        const { name, email, role } = req.body as {
            name: string
            email: string
            role: string
        }

        const user_to_update = await pool.request().input('id', mssql.VarChar, id).execute('get_single_user')
        if (!user_to_update.recordset[0]) {
            return res.json({ message: "user with that id does not exist..." })
        }
        await pool.request()
            .input('id', mssql.VarChar, id)
            .input('email', mssql.VarChar, email)
            .input('role', mssql.VarChar, role)
            .input('name', mssql.VarChar, name)
            .execute('updateUser')

        res.json({ message: "user successfully updated....." })

    } catch (error: any) {

        res.json({ error })

    }

}

export const checkUser= async (req:Extended, res:Response)=>{

    
    if(req.info){
                
       res.json({name:req.info.user_name, role:req.info.user_role,email:req.info.user_email})
     
     
    }
  }

