import AuditLog from "../models/auditLogModel.js";

const createAuditLog = async ({
  performedBy,
  action,
  targetUser = null,
  details = "",
  ipAddress = "",
  userAgent = "",
}) => {
  try {
    await AuditLog.create({
      performedBy,
      action,
      targetUser,
      details,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

export default createAuditLog;