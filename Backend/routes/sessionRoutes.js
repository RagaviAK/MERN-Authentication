import express from "express";
import { getAllSessions, logoutAllSession, logoutCurrentSession } from "../controller/sessionController.js";
import userAuth from "../middleware/userauth.js";

const sessionRouter=express.Router();

sessionRouter.get('/',userAuth,getAllSessions);
sessionRouter.delete('/:sessionId',userAuth,logoutCurrentSession);
sessionRouter.delete('/',userAuth,logoutAllSession);



export default sessionRouter;