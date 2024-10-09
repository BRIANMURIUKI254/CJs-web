import { useState, useEffect } from "react";
import Form from "./Admin/Form";
import Sidenav from "./Admin/Sidenav";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./User/Pages/Main";
import Menu from "./User/Pages/Menu";
import Cart from "./User/Pages/Cart";
import Checkout from "./User/Pages/Checkout"; // Import Checkout
import Navbar from "./User/Components/Navbar"; // Import Navbar
import { auth, db } from "./Helpers/config"; // Import Firebase auth and db
import { getDoc, doc } from "firebase/firestore";
import Login from "./User/Pages/Login";
import SignUp from "./User/Pages/SignUp";
import Orders from "./Admin/Orders"; // Import Orders component
import "./App.css"


function App() {
  const [showform, setshowform] = useState(false);
  const [showOrders, setShowOrders] = useState(false); // State for showing orders
  const [cartProducts, setcartProducts] = useState(() => {
    const storage = localStorage.getItem("cartProducts");
    return storage ? JSON.parse(storage) : [];
  });
  const [activeUser, setActiveUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "usercredential", user.uid));
        if (userDoc.exists()) {
          setActiveUser({ Name: userDoc.data().Nom, uid: user.uid });
        } else {
          setActiveUser({ Name: user.displayName, uid: user.uid });
        }

        // Check if the user is an admin  setIsAdmin(adminDoc.exists());
      } else {
        setActiveUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const tog = () => {
    setshowform(true);
    setShowOrders(false); // Hide orders when form is shown
  };

  const showOrdersComponent = () => {
    setShowOrders(true);
    setshowform(false); // Hide form when orders are shown
  };

  const addToCart = (product) => {
    setcartProducts(cartProducts.concat(product));
  };

  const removeFromCart = (product) => {
    setcartProducts(cartProducts.filter((item) => item !== product));
  };

  return (
    <BrowserRouter>
      <AppContent
        showform={showform}
        setshowform={setshowform}
        showOrders={showOrders}
        showOrdersComponent={showOrdersComponent}
        cartProducts={cartProducts}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        activeUser={activeUser}
        isAdmin={isAdmin}
        tog={tog}
      />
    </BrowserRouter>
  );
}

function AppContent({
  showform,
  showOrders,
  showOrdersComponent,
  cartProducts,
  addToCart,
  removeFromCart,
  activeUser,
  isAdmin,
  tog,

}) {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/Login", "/signup", "/add"];

  return (
    <div className="app">
      {hideNavbarPaths.includes(location.pathname) ? null : (
        <Navbar
          cartCount={cartProducts.length}
          activeUser={activeUser}
          isAdmin={isAdmin}
        />
      )}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Main />}></Route>
        <Route path="/menu" element={<Menu addCart={addToCart} />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/cart"
          element={
            <Cart
              prod={cartProducts}
              removeFromCart={removeFromCart}
              activeUser={activeUser}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          element={<Checkout prod={cartProducts} activeUser={activeUser} />}
        ></Route>

        {/* Admin Routes */}
        {isAdmin && (
                  <>
                  <Route
                    path="/add"
                    element={
                      <div>
                        <Sidenav ProductClick={tog} OrdersClick={showOrdersComponent} />
                        <div>{showform ? <Form /> : null}</div>
                      </div>
                    }
                  ></Route>
                  <Route
                    path="/orders"
                    element={
                      <div>
                        <Sidenav ProductClick={tog} OrdersClick={showOrdersComponent} />
                        <div>{showOrders ? <Orders /> : null}</div>
                      </div>
                    }
                  ></Route>
                </>
          
        )}
      </Routes>
    </div>
  );
}

export default App;

// Admin auth check 
// orders route 