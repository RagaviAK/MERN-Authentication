import React, { useState, useContext, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  axios.defaults.withCredentials = true;
  const {backend}=useContext(AppContent);

  const  navigate=useNavigate();
  const inputRef = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };
const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      console.log(otp)
      setOtpSubmitted(true)      
    }
  const onSubmitPass = async (e) => {
    e.preventDefault();
    try {
      console.log({email,otp,newPassword})

      const { data } = await axios.post(backend + "api/auth/verify-resetotp", {email,otp,newPassword});
      if (data.success) {

        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backend + "api/auth/pass-reset",{email});
      if (data.success) {
        toast.success(data.message);
        setEmailSent(true);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt="auth-logo"
        onClick={() => navigate("/")}
        className="w-28 sm:w-32 absolute left-5 sm:left-20 top-5 cursor-pointer"
      />
      {/* Email verification */}
      {!emailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="w-96 rounded-lg bg-slate-900 text-sm shadow-lg p-8"
        >
          <h1 className="text-2xl font-semibold text-center text-white mb-4">
            Reset password
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter your registered email address
          </p>
          <div className="flex items-center gap-3 px-5 py-2.5 w-full rounded-full mb-4 bg-[#333A5C] text-white mb-8">
            <img src={assets.mail_icon} alt="email-icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email ID"
              className="outline-none bg-transparent"
              required
            />
          </div>
          <button className="w-full text-white bg-indigo-500 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer">
            Submit
          </button>
        </form>
      )}
      {/* Otp verification */}
      {!otpSubmitted && emailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="w-96 rounded-lg bg-slate-900 text-sm shadow-lg p-8"
        >
          <h1 className="text-2xl font-semibold text-center text-white mb-4">
            Reset password OTP
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter the 6-digit code sent to your email id
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center rounded-md text-xl"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full text-white bg-indigo-500 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {/* password changing form*/}
      {otpSubmitted && emailSent && (
        <form onSubmit={onSubmitPass} className="w-96 rounded-lg bg-slate-900 text-sm shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center text-white mb-4">
            New password
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter your new password
          </p>
          <div className="flex items-center gap-3 px-5 py-2.5 w-full rounded-full mb-4 bg-[#333A5C] text-white mb-8">
            <img src={assets.lock_icon} alt="lock-icon" />
            <input
              onChange={(e) => setnewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="New password"
              className="outline-none bg-transparent"
              required
            />
          </div>
          <button className="w-full text-white bg-indigo-500 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassPage;
