import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyotp: { type: String, default: "" },
  verifyotpExpiredAt: { type: Number, default: 0 },
  isVerified: { type:Boolean, default: false },
  resetotp: { type: String, default: "" },
  resetotpExpiredAt: { type: Number, default: 0 },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
