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
        .json({ message: "user with that email already exist" });
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);

      await db.exec("InsertUpdate", {
        user_id,
        email,
        phone,
        hashedpassword,
        user_role,
        is_sent,
        name,
      });
      res
        .status(200)
        .json({
          message: "Registered...Redirecting to login page....",
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
      return res.status(401).json({ message: "User Not found" });
    }
    console.log(password);
    
    const valid_password = await bcrypt.compare(
      password,
      user_exist[0].hashedpassword
    );

    if (!valid_password) {
      res.status(401).json({ message: "invalid details" });
    }

    const payload = user_exist.map((item) => {
      const { hashedpassword, ...rest } = item;
      return rest;
    });
    //, { expiresIn: '3600s' }

    const token = jwt.sign(payload[0], process.env.key as string);
    return res
      .status(200)
      .json({ message: "you are logged in", token: token});
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
    console.log(user_id);
    
    const single_user: User[] = (
        await db.exec("get_single_user",{user_id})
      ).recordset;

    if (!single_user) {
      res.json({ message: "user not found!!" });
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
    const id = req.params.id;
    const pool = await mssql.connect(sqlConfig);

    const delete_user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("get_single_user");
    if (!delete_user.recordset[0]) {
      res.json({ message: "user with that id does not exist..." });
    } else {
      await pool.request().input("id", mssql.VarChar, id).execute("deleteUser");
      res.json({ message: "user successfully deleted...." });
    }
  } catch (error: any) {
    res.json({ error });
  }
};

export const updateuser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await mssql.connect(sqlConfig);

    const { user_name, user_email, role } = req.body as {
      user_name: string;
      user_email: string;
      role: string;
    };

    const user_to_update = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("get_single_user");
    if (!user_to_update.recordset[0]) {
      return res.json({ message: "user with that id does not exist..." });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("user_email", mssql.VarChar, user_email)
      .input("role", mssql.VarChar, role)
      .input("user_name", mssql.VarChar, user_name)
      .execute("updateUser");

    res.json({ message: "user successfully updated....." });
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
};
