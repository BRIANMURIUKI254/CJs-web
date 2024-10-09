import React from 'react';
import './Side.css';
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Helpers/config";

const Sidenav = ({ ProductClick, OrdersClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="sidenav">
        <Link to="#" onClick={ProductClick}>Products</Link>
        <Link to="#" onClick={OrdersClick}>Orders</Link> {/* New Orders link */}
        <Link to="#" onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
}

export default Sidenav;


// logout auth & auth generally 
// orders link