import React, { useState } from "react";
import "../Styles/login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-white.png";
import { auth, provider } from "../../Helpers/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // State for reset email
  const [resetMessage, setResetMessage] = useState(""); // State for reset message
  const [showResetForm, setShowResetForm] = useState(false); // State to toggle reset form
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const googl = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/menu");
    } catch (error) {
      setError(error.message);
    }
  };

  const LogIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/menu");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent!");
    } catch (error) {
      setResetMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-section">
        <div className="logo">
          <img src={logo} alt="" width="20px" />
        </div>
        <h2>Welcome back, Mike</h2>
        <p>Welcome back! Please enter your details.</p>
        <button className="google-login" onClick={googl}>
          <FcGoogle /> Log in with Google
        </button>
        <p>or</p>
        {error && <p className="error">{error}</p>} {/* Display error messages */}
        <form>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <Link
              to="#"
              className="forgot"
              onClick={() => setShowResetForm(true)}
            >
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="login-button" onClick={LogIn}>
            Log in
          </button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign up for free</Link>
        </p>

        {/*  forgot password form  */}
        {showResetForm ? (
          <form onSubmit={handlePasswordReset}>
            <input
              type="email"
              placeholder="Enter your email to reset password"
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </form>
        ) : null}
        {resetMessage ? <p>{resetMessage}</p> : null}
      </div>

      <div className="image-section">
        <div className="image-overlay">
          <div className="quote">
            <p>
              Welcome to CJ's, a fully fledged restaurant specializing in
              delivering <br /> delivering a relaxed and memorable dining
              experience. <br />
              We’re currently in 14 locations; 5 in Nairobi, 8 in Kampala and 1
              in Entebbe. <br />
              We look forward to serving you, You're more than welcome to Find
              us here
            </p>
            <div className="quote-author"></div>
            <div className="navigation"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// State for reset email
// State for reset message
// State to toggle reset form
