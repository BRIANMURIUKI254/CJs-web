import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

const Cart = ({ prod, removeFromCart, activeUser }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (activeUser) {
      navigate("/checkout");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div>
      <h1>This is the cart page</h1>
      <div className="cartItems">
        {prod.map((result, index) => (
          <div key={index} className="prodItems">
            <img src={result.image} alt="" />
            <div className="heads">
              <h5>
                <span>ITEM: </span>
                {result.head}
              </h5>
              <p>{result.Bei}</p>
              <button
                onClick={() => removeFromCart(result)}
                className="remove-btn"
              >
                Remove
              </button>
              {/* Remove button */}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout} className="checkout-btn">
        Checkout
      </button>
      {/* Checkout button */}
    </div>
  );
};

export default Cart;

// remove button for a product in cart
// checkout button
