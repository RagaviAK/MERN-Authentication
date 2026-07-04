import express from "express";
import userAuth from "../middleware/userauth.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import {
  getDashboard,
  getAllUsers,
  updateUserRole,
} from "../controller/adminController.js";
const adminRouter = express.Router();
import { getAuditLogs } from "../controller/adminController.js";

adminRouter.get(
  "/dashboard",
  userAuth,
  authorizeRoles("admin"),
  getDashboard
);
adminRouter.get(
  "/users",
  userAuth,
  authorizeRoles("admin"),
  getAllUsers
);
adminRouter.patch(
  "/users/:userId/role",
  userAuth,
  authorizeRoles("admin"),
  updateUserRole
);
adminRouter.get(
    "/audit-logs",
    userAuth,
    authorizeRoles("admin"),
    getAuditLogs
);

export default adminRouter;