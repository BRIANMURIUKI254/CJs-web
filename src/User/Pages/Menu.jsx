import { useState, useEffect } from "react";
import { db } from "../../Helpers/config";
import { getDocs, collection } from "firebase/firestore";
import "../Styles/Menu.css";

const Menu = ({ addCart }) => {
  const [item, setItem] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    try {
      const collect = await getDocs(collection(db, "Products"));
      const doc = collect.docs;

      const result = doc.map((docItem) => {
        const data = docItem.data();
        return {
          id: docItem.id,
          image: data.image,
          head: data.head,
          Bei: data.Bei,
        };
      });
      setItem(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    addCart(product);
    setSuccessMessage("Product added to cart!");
    setTimeout(() => {
      setSuccessMessage(""); 
    }, 3000);
  };

  return (
    <div>
      <div className="upp">
        <h1>BREAKFAST COMBOS</h1>
      </div>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <div className="down">
        {item.map((x) => (
          <div key={x.id} className="product"> 
            <img src={x.image} alt={x.head} loading="lazy" />
            <h5>{x.head} </h5>
            <p>{x.Bei}</p>
            <button onClick={() => handleAddToCart(x)}>ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;