import React, { useState, useEffect } from "react";
import PasswordBox from "../components/Password"; // Fixed typo in component name

import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const Homepage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const BaseUrl = "http://147.93.30.41:4000";

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = urlParams.get("id");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      console.log(tokenFromUrl)
    }
  }, [location]);

  useEffect(() => {
    // Validate password requirements
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const setResetPassword = async () => {
    if (!token) {
      toast.error("Invalid or expired token. Please request a new password reset link.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!Object.values(passwordRequirements).every(req => req)) {
      toast.error("Password does not meet requirements");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.put(`${BaseUrl}/auth/password/reset/${token}`, {
        password: password,
        confirmPassword: confirmPassword,
      });
      console.log("Password reset successful:", res.data);
      toast.success("Password reset successful! You can now login with your new password.");
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error(error.response?.data?.message || "Password reset failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full mb-4">
            <FiLock className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center">
            Reset Your Password
          </h2>
          <p className="text-gray-400 text-center mt-2">
            Enter a new password for your GymsHood account
          </p>
        </div>

        <div className="space-y-6">
          <PasswordBox
            label="New Password"
            password={password}
            setPassword={setPassword}
            icon={<FiLock className="text-gray-400" />}
          />

          <div className="bg-gray-700 rounded-lg p-3 text-xs text-gray-300">
            <h4 className="font-medium mb-2">Password Requirements:</h4>
            <ul className="space-y-1">
              <li className={`flex items-center ${passwordRequirements.length ? "text-green-400" : "text-gray-400"}`}>
                {passwordRequirements.length ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
                At least 8 characters
              </li>
              <li className={`flex items-center ${passwordRequirements.uppercase ? "text-green-400" : "text-gray-400"}`}>
                {passwordRequirements.uppercase ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
                At least one uppercase letter
              </li>
              <li className={`flex items-center ${passwordRequirements.number ? "text-green-400" : "text-gray-400"}`}>
                {passwordRequirements.number ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
                At least one number
              </li>
              <li className={`flex items-center ${passwordRequirements.specialChar ? "text-green-400" : "text-gray-400"}`}>
                {passwordRequirements.specialChar ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
                At least one special character
              </li>
            </ul>
          </div>

          <PasswordBox
            label="Confirm New Password"
            password={confirmPassword}
            setPassword={setConfirmPassword}
            icon={<FiLock className="text-gray-400" />}
          />

          <button
            onClick={setResetPassword}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isSubmitting
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;