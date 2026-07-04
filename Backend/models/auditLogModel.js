import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    details: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;