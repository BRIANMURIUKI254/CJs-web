 /* eslint-disable no-unused-vars */
import React from "react";
import Logo from "../../assets/cjslogo.png";
import { PiChefHatThin } from "react-icons/pi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { GrCafeteria } from "react-icons/gr";
import "../Styles/Main.css";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";


const Main = () => {
  return (
    <div>
      <div className="hero">
        <div className="left">
          <button>START ORDER</button>
        </div>
        <div className="right">
          <div className="one">
            <img src={Logo} width="200px" alt="" />
            <hr />
            <div className="homeLinks">
              <PiChefHatThin />
              <Link to='/menu'>MENU</Link>
            </div>
            <hr />
            <div className="homeLinks">
              <MdOutlineLocationOn />
              <a href="">LOCATIONS</a>
            </div>
            <hr />
            <div className="homeLinks">
              <FaRegComments />
              <a href="">CAREERS</a>
            </div>
            <hr />
            <div className="homeLinks">
              <GrCafeteria />
              <a href="">FEEDBACK</a>
            </div>
            <hr />
            <div className="homeLinks">
              <PiChefHatThin />
              <a href="">ABOUT US</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
