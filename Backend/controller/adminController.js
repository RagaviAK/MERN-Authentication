import userModel from "../models/userModels.js";
import Session from "../models/sessionModels.js";
import AuditLog from "../models/auditLogModel.js";
import createAuditLog from "../utils/auditLogger.js";


export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const verifiedUsers = await userModel.countDocuments({
      isVerified: true,
    });

    const unverifiedUsers = await userModel.countDocuments({
      isVerified: false,
    });

    const activeSessions = await Session.countDocuments();

    return res.json({
      success: true,
      dashboard: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
        activeSessions,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password -verifyotp -resetotp");

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    // Check if role is valid
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Find user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update role
    const oldRole = user.role;

user.role = role;

await user.save();

await createAuditLog({
  performedBy: req.userId,
  action: "CHANGE_ROLE",
  targetUser: user._id,
  details: `Role changed from ${oldRole} to ${role}`,
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
});
    

    return res.json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "name email")
      .populate("targetUser", "name email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      logs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};