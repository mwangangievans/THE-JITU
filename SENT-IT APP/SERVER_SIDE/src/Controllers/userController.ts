import { request, Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { sqlConfig } from "../config/config.js";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import { UserSchema, UserSchema2 } from "../helpers/userValidation.js";
import { User } from "../interface/interface.js";
import jwt from "jsonwebtoken";
import Connection from "../databaseHelper/DB";
const db = new Connection();

import dotenv from "dotenv";
dotenv.config();

import { Data } from "../interface/interface.js";
import { string } from "joi";

interface Extended extends Request {
  info?: Data;
}

interface ExtendedRequest extends Request {
  body: {
    email: string;
    password: string;
    name: string;
    phone: string;
  };
}
export const registerUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const user_id = uid();
    console.log(req.body);

    const user_role: string = "user";
    const is_sent = "0";
    const is_deleted = "0";


    const { email, password, name, phone } = req.body;
    const { error, value } = UserSchema.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const check_if_user_exist: User[] = (
      await db.exec("check_user_if_exist", { email })
    ).recordset;

    if (check_if_user_exist[0]) {
      return res
        .status(409)
        .json({ message: "user with that email already exist" ,statuscode:409});
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);

      await db.exec("CREATEUSER", {
        user_id,
        email,
        phone,
        hashedpassword,
        user_role,
        is_sent,
        name,
        is_deleted
      });
      res
        .status(200)
        .json({
          message: "Registered...Redirecting to login page....",statuscode:200
        });
    }
  } catch (error) {
    return res.json({ error });
  }
};

export const loginUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const { email, password } = req.body;

    const { error, value } = UserSchema2.validate(req.body);
    if (error) {
      res.json({ Error: error.details[0].message });
    }

    const user_exist: User[] = (
        await db.exec("check_user_if_exist", { email })
      ).recordset;
 
    if (!user_exist[0]) {
      return res.status(401).json({ message: "User Not found" ,statuscode:200});
    }
    console.log(password);
    
    const valid_password = await bcrypt.compare(
      password,
      user_exist[0].hashedpassword
    );

    if (!valid_password) {
      res.status(401).json({ message: "invalid details" ,statuscode:401});
    }

    const payload = user_exist.map((item) => {
      const { hashedpassword, ...rest } = item;
      return rest;
    });
    //, { expiresIn: '3600s' }

    const token = jwt.sign(payload[0], process.env.key as string);
    return res
      .status(200)
      .json({ message: "you are logged in", token: token,statuscode:200});
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {

    const users: User[] = (
        await db.exec("get_all_users")
      ).recordset;
      
    if (!users) {
      res.json({ message: "no users in the database" });
    }
    console.log(users);
    
    return res.json(users);
  } catch (error) {
    res.json({ error });
  }
};

export const getSingleUser: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const user_id = req.params.id;
    
    const single_user: User[] = (
        await db.exec("get_single_user",{user_id})
      ).recordset;

    if (single_user.length===0) {
      res.status(404).json({ message: "user not found!!" ,statuscode:404});
    } else {
      console.log(single_user);

      res.json(single_user);
    }
  } catch (error: any) {
    res.json({ error });
  }
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const user_id = req.params.id
    const single_user: User[] = (
        await db.exec("get_single_user",{user_id})
      ).recordset;   
      

      console.log("user....."+single_user);
      
      
      if (single_user.length===0) {
     return res.status(404).json({ message: "User with that id does not exist..." ,statuscode:404})
     }else{
        await db.exec("deleteUser",{user_id})

       return  res.status(202 ).json({ message: "User successfully deleted...." ,statuscode:202})
     }
    
} catch (error:any) {
    res.json({error})
};
}

export const updateuser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const user_id = req.params.id;
    
  
    const { user_email,phone ,user_role, user_name,is_deleted } = req.body 
    
console.log(
  user_email,phone ,user_role, user_name,is_deleted 
    );

    const single_user: User[] = (
        await db.exec("get_single_user",{user_id})
      ).recordset;   
      
      
    if (single_user.length===0) {
      return res.json({ message: "user with that id does not exist..." });
    }else{
      await db.exec("UpdateUser",{user_id, user_email,phone ,user_role, user_name,is_deleted })

      return  res.status(204).json({ message: "User successfully updated...." ,statuscode:204 })
    }
 
  } catch (error: any) {
    res.json({ error });
  }
};

export const checkUser = async (req: Extended, res: Response) => {
  if (req.info) {
    res.json({
      user_name: req.info.user_name,
      role: req.info.user_role,
      user_email: req.info.user_email,
    });
  }
}

