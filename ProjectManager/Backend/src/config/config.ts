import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.DB_USER,);
// console.log(process.env.DB_PWD ,process.env.DB_NAME);


export const sqlConfig = {
  user: process.env.DB_USER as string,
  
  password: process.env.DB_PWD as string,
  database:process.env.DB_NAME as string,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000,
  },
  options: {
    encrypt: false, 
    trustServerCertificate: false, 
  },
};
