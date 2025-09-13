import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connect from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app=express();
const PORT=process.env.PORT;;
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5174',
    credentials:true}))
connect();
app.get('/',(req,res)=>{
    console.log("Get request get");
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(PORT,()=>{
    console.log(`App is running : ${PORT}`);
})