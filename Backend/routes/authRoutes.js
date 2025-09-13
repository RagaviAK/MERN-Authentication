import express from "express"
import { isAuthenticated, login, logOut, passResetOtp, register, sendVerifyOtp, verification, verifyAndReset } from "../controller/authController.js"
import userAuth from "../middleware/userauth.js";

const authRouter=express.Router()

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logOut);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verification);
authRouter.post('/is-Auth',userAuth,isAuthenticated);
authRouter.post('/pass-reset',passResetOtp);
authRouter.post('/verify-resetotp',verifyAndReset);

export default authRouter;