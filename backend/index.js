// IMPORTS
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./Routers/Auth.js";
import cors from "cors";
import session from "express-session";
import AddPasswordRouter from "./Routers/add_password.routes.js";
dotenv.config()

async function MongoDBConnect() { 
    try {
         await mongoose.connect(`mongodb+srv://vaibhav22101_db_user:${process.env.MONGODB_PASSWORD}@cluster-1.gc3qogw.mongodb.net/?appName=Cluster-1`)
        console.log('Connected to MongoDB')}
    catch (error){
        console.log("Error Occured",error);
        process.exit(1);
    }
}

MongoDBConnect()


const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret:"mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 ,httpOnly: true}, // 1 hour
}))


app.use("/auth",AuthRouter)
app.use("/add-password-api",AddPasswordRouter)
app.listen(3000, () => console.log('Server started on port 3000'))