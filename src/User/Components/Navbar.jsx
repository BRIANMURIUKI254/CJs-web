import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo-white.png";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../Helpers/config";

const Navbar = ({ cartCount, activeUser, isAdmin }) => {
  const LogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar-one">
      <div className="logo">
        <img src={logo} alt="Logo" className="logoImage" />
      </div>

      <ul className="menu">
        <li className="menuItem">
          <Link to="/">HOME</Link>
        </li>
        <li className="menuItem">
          <a href="#features" className="link">
            FEATURES
          </a>
        </li>
        <li className="menuItem">
          <a href="#products" className="link">
            PRODUCTS
          </a>
        </li>
        <li className="menuItem">
          <a href="#deals" className="link">
            DEALS
          </a>
        </li>
      </ul>

      <div className="icons">
        {activeUser ? (
          <>
            <span className="init">{activeUser.Name ? activeUser.Name.charAt(0) : ''}</span>
            {isAdmin ? (
              <Link to="/add" className="add-products">
                Add Products
              </Link>
            ) : (
              <button onClick={LogOut} className="log-out">
                LogOut
              </button>
            )}
          </>
        ) : (
          <Link to="/Login">
            <FaUser className="icon" />
          </Link>
        )}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart className="icon" />
          {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
// 1. CartCount
// 2. Google Auth state 
// 2. User authState place in app.jsx.
// 3. Remove Product button in cart page.
// 4. Create a checkout button and checkout Page that get the product.
// 5. Send auth as props to all pages (checkout, cart page).
// 6. IMPROVE ADMIN TO RENDER ADD PRODUCTS IN NAVBAR IF ITS AN ADMIN[NOTES IN TXT]
