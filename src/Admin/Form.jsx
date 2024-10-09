import React, { useEffect, useState } from "react";
import { db, storage, auth } from "../Helpers/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const Form = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [productData, setproductData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const [user, setUser] = useState(null); // State for authenticated user

  console.log(productData);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // fetching data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productDoc = await getDocs(collection(db, "Products"));
      const docs = productDoc.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setproductData(docs);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handling form
  const upload = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      let url = "";
      if (image) {
        const imageRef = ref(storage, "Photos/" + image.name); // Ensure correct file path
        await uploadBytes(imageRef, image);
        url = await getDownloadURL(imageRef);
      }
      const productData = {
        Bei: price,
        head: title,
        image: url,
      };

      if (editId) {
        // Update existing product
        await updateDoc(doc(db, "Products", editId), productData);
        setEditId(null);
      } else {
        // Add new product
        await addDoc(collection(db, "Products"), productData);
      }
      fetchData();
    } catch (error) {
      setError("Failed to upload product. Please try again.");
      console.error("Error uploading file:", error); // Log the error details
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "Products", id));
      fetchData();
    } catch (error) {
      setError("Failed to delete product. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setTitle(product.head);
    setPrice(product.Bei);
    setImage(null);
    setEditId(product.id);
  };

  return (
    <div>
      {error ? <p className="error">{error}</p> : null} {/* Display error messages */}
      {loading ? <p>Loading...</p> : null} {/* Display loading status */}
      <div className="product-container">
        <div className="product-details">
          {productData.map((x) => (
            <div key={x.id}>
              <div className="image-details">
                <img src={x.image} alt="" />
              </div>
              <p>{x.head}</p>
              <p>{x.Bei}</p>
              <button className="delete" onClick={() => del(x.id)}>
                Delete
              </button>
              <button className="delete" onClick={() => handleEdit(x)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      <form className="form">
        <div>
          <input
            type="text"
            value={title}
            placeholder="Product Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={price}
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="Product Image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button onClick={upload} disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default Form;