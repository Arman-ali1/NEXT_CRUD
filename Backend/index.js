import { app } from "./app.js";
import dotenve from "dotenv";
import mysql from 'mysql'
// import connectDB from "./DB/database.js";
import { databaseName } from "./constants.js";

// Environment variables configure
dotenve.config({ path: "./.env" });

// database connection and server listen
const dbConnectionInstance = async () => {
  return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Ak@12345',
      database: databaseName
  }
,
  console.log(`Database connection Successful :`)
);
 
};
dbConnectionInstance()
  .then(() => {
    app.listen( process.env.PORT || 8000 , () => {
      console.log(`Server is listening... at ${process.env.PORT}`);
    });
    
    app.on("error",(error)=>{
      throw error
    })
  })
  .catch((error) => {
    console.log(`Data connection Failed..!!`, error);
  });

  export default dbConnectionInstance