import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModels.js";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. Login again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

const { id, role, sessionId } = decoded;

    if (!id || !sessionId) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }

    const session = await sessionModel.findById(sessionId);

    if (!session) {
      return res.json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Optional safety check
    if (session.userId.toString() !== id) {
      return res.json({
        success: false,
        message: "Invalid Session",
      });
    }

    // Check session expiry
    if (session.expiresAt < new Date()) {
      await session.deleteOne();

      return res.json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Update last active time
    session.lastActive = new Date();
    await session.save();

    // Store values for controllers
    req.userId = id;
    req.role = role;
    req.sessionId = session._id.toString();

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;