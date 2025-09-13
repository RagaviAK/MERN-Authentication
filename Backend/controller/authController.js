import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already exists",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedpassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our webpage",
      text: `welcome to the webpage, your account veriefied with your email : ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Field is missing",
    });
  }
  try {
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.json({
        success: false,
        message: "User was not found",
      });
    }
    const match = await bcrypt.compare(password, userExist.password);
    if (!match) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const  userId  = req.userId;

    const user = await userModel.findById(userId);

    if (user.isVerified) {
      return res.json({
        success: false,
        message: "User Account already Verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyotp = otp;
    user.verifyotpExpiredAt = Date.now() + 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification Code",
      text: `Your verification code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Verification otp sent to email",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verification = async (req, res) => {
  const userId = req.userId;
  const {otp}=req.body;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Invalid User",
    });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.verifyotp == "" || user.verifyotp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verifyotpExpiredAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.verifyotp = "";
    user.verifyotpExpiredAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: true,
      message: error.message,
    });
  }
};

export const passResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Invalid Email",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetotp = otp;
    user.resetotpExpiredAt = Date.now() + 60 * 60 * 1000;

    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "otp for password reset",
      text: `your password reset otp is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "password reset otp sent to email",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyAndReset = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  if (!email || !newPassword || !otp) {
    return res.json({
      success: false,
      message: "Field Missing",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.resetotp == "" || user.resetotp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetotpExpiredAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    user.resetotp = "";
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;
    user.resetotpExpiredAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
