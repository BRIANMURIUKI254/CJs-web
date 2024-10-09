/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../Styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Helpers/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      var x = await createUserWithEmailAndPassword(auth, email, password);
      const cred = x.user.uid;

      // database
      await setDoc(doc(db, "usercredential", cred), {
        Nom: name,
      });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      error.message = "Your password must be atleast 6 characters";
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <p>{error}</p>
        <button type="submit" onClick={SignUp} className="btn">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
