import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connect from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app=express();
const PORT=process.env.PORT;;
app.set("trust proxy", 1);
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true}))
connect();
app.get('/',(req,res)=>{
    console.log("Get request get");
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/session',sessionRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT,()=>{
    console.log(`App is running : ${PORT}`);
})