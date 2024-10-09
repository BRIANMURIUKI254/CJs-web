/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Tripone from "../../assets/tripadvisor-2022.png";
import Triptwo from "../../assets/tripadvisor-logo.png";
import '../Styles/Footer.css'
import Gift from '../../assets/gift-card.jpg'
import Drinks from '../../assets/drinks.jpg'

const Footer = () => {
  return (
    <div>
      <div className="cards">
        <img src={Gift}alt="" />
        <img src={Drinks} alt="" />
      </div>
      <div className="top">
        <div className="one">
          <div className="socials">
            <FaFacebookSquare />
            <FaXTwitter />
            <FaInstagram />
          </div>
          <p>Join our email list</p>
          <div className="any">
            <input type="text" placeholder="Email adress" />
            <span>Subscribe</span>
            <button>Unsubscribe</button>
          </div>
          <p>
            By clicking "SUBSCRIBE" I agree to receive news, promotions,
            information, and offers from CJ's.
          </p>
        </div>

        <div className="two">
          <img src={Triptwo} width="150px" alt="" />
          <img src={Tripone} width="150px" alt="" />
        </div>
      </div>
      
      <div className="bottom">
        <div className="up">
          <div className="sideone">
            <p id="para">CONTACT US - 0800 720 003</p>
            <div className="location">
              <p>LOCATIONS</p>
              <ul>
                <li>Kilimani</li>
                <li>Koinange Street</li>
                <li>Village market</li>
                <li>The Waterfront Mall, Karen</li>
                <li>The Imara Mall</li>
              </ul>
            </div>
          </div>
          <div className="sidetwo">
            <div className="menu">
              <p>OUR MENU</p>
              <ul>
                <li>BREAKFAST</li>
                <li>DRINKS</li>
                <li>MAINS</li>
                <li>DESERTS</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="down">
          <p>
            We're commited to great food, great coffee, great service, an
            experience that will make your time with us fabulous. All visuals
            are serving suggestions only. Prices are quoted in Kenyan Shillings
            and inclusive of VAT.
          </p>
          <div className="lnks">
            <a href="">Privacy Policy |</a>
            <a href="">Terms Of use |</a>
            <a href="">Contact Us |</a>
            <a href="">Feedback |</a>
          </div>
          <p>&copy; 2024 CJ's. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
