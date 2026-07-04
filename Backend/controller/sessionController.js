import sessionModel from "../models/sessionModels.js";
import createAuditLog from "../utils/auditLogger.js";

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionModel
      .find({ userId: req.userId })
      .sort({ loginTime: -1 });
    return res.json({
    success: true,
    currentSessionId: req.sessionId,
    sessions,
});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logoutCurrentSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await sessionModel.findById(sessionId);
    if (!session) {
      return res.json({ success: false, message: "Session not found" });
    }
    if (session.userId.toString() !== req.userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    await session.deleteOne();
    await createAuditLog({
  performedBy: req.userId,
  action: "LOGOUT_DEVICE",
  targetUser: req.userId,
  details: `Logged out ${session.deviceName} (${session.browserName})`,
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
});
    if (req.sessionId.toString() === sessionId) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
    }
    return res.json({
      success: true,
      message: "Device logged out successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logoutAllSession = async (req, res) => {
  try {
    await sessionModel.deleteMany({
      userId: req.userId,
      _id: { $ne: req.sessionId },
    });
    await createAuditLog({
  performedBy: req.userId,
  action: "LOGOUT_ALL_DEVICES",
  targetUser: req.userId,
  details: "Logged out all other active sessions",
  ipAddress: req.ip,
  userAgent: req.headers["user-agent"],
});
    return res.json({
      success: true,
      message: "All other devices logged out successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
