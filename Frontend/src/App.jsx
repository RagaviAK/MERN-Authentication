import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPassPage from "./pages/ResetPassPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecurityPage from "./pages/SecurityPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AuditLogs from "./pages/AuditLogs";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Reset-Pass" element={<ResetPassPage />} />
        <Route path="/Email-verify" element={<EmailVerifyPage />} />
        <Route path="/Security" element={<SecurityPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <AdminRoute>
              <AuditLogs />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
