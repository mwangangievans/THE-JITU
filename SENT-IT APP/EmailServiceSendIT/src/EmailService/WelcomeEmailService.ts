import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";
import { sqlConfig } from "../Config/Config";
dotenv.config();
import sendMail from "../Helpers/Email";
import Connection from "../DatabaseHelpers/db";
const db = new Connection();
interface IUser {
  user_id: string;
  name: string;
  email: string;
  welcome: string;
}

const WelcomeEmail = async () => {
  const pool = await mssql.connect(sqlConfig);
  const users: IUser[] = await (await db.exec("welcom_mail")).recordset;
  
  console.log(users);

  for (let user of users) {
    ejs.renderFile(
      "templates/WelcomeEmail.ejs",
      { name: user.name },
      async (error, data) => {
        let messageoption = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Welcome To SendIT, Thanks for Signing Up!",
          html: data,
          attachments: [
            {
              filename: "user.text",
              content: `Welcome email: ${user.name}`,
            },
          ],
        };

        try {
          await sendMail(messageoption);
          console.log(user.user_id);
          
          await db.exec("reset_welcom_mail", { user_id:user.user_id }); 

          console.log("Welcome Email Sent");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};

export default WelcomeEmail;
