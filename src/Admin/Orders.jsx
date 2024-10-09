import React, { useEffect, useState } from "react";
import { db } from "../Helpers/config"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import "../User/Styles/Orders.css"; // Import CSS

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userEmail: data.userEmail,
            userAddress: data.userAddress,
            products: data.products,
            timestamp: data.timestamp
          };
        });
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  // const fetchOrders = async () => {
//     try {
//       const ordersCollection = collection(db, "orders");
//       const ordersSnapshot = await getDocs(ordersCollection);
//       const ordersList = ordersSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setOrders(ordersList);
//     } catch (error) {
//       console.error("Error fetching orders: ", error);
//     }
//   };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Address</th>
            <th>Product Count</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
              <td>{order.userAddress}</td>
              <td>{order.products.length}</td>
              <td>{new Date(order.timestamp.seconds * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
