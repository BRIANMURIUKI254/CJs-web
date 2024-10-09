import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { db } from "../../Helpers/config"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "../Styles/Checkout.css";

const Checkout = ({ prod, activeUser }) => {
  // Individual state for each form input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Redirect to login if user is not active
  if (!activeUser) {
    return <Navigate to="/Login" />;
  }

  // Handle form input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!name || !email || !address) {
      alert("All fields are required.");
      return;
    }
    try {
      // Add order to Firestore
      await addDoc(collection(db, "orders"), {
        userId: activeUser.uid,
        userName: name,
        userEmail: email,
        userAddress: address,
        products: prod,
        timestamp: new Date(),
      });
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <div className="checkout-container">
        <div className="checkout-items">
          {prod.map((result, index) => (
            <div key={index} className="checkout-item">
              <img src={result.image} alt="" />
              <div className="item-details">
                <h5>{result.head}</h5>
                <p>{result.Bei}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-form">
          <h2>Checkout Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;