import express from "express";
import userAuth from "../middleware/userauth.js";
import { getUserInfo } from "../controller/userController.js";

const userRouter=express.Router();

userRouter.get('/data',userAuth,getUserInfo);

export default userRouter;