import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user, token } = useUser();
  const isLoggedIn = !!user;

  const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD
  const [loading, setLoading] = useState(false);
  const [shop ,setShop] = useState('')

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/authentication", { state: { from: "/" } });
    }
  }, [isLoggedIn, navigate]);

  // Load products from navigation state or fallback
  useEffect(() => {
    if (location.state?.product) {
      const incoming = location.state.product;
      setProducts(Array.isArray(incoming) ? incoming : [incoming]);
      setShop(location.state.shopName);
    } else {
      setProducts([
        { id: 1, name: "Product Name 1", code: "P001", price: 500, quantity: 1, img: "/images/product.png" },
        { id: 2, name: "Product Name 2", code: "P002", price: 750, quantity: 2, img: "/images/product.png" }
      ]);
    }
  }, [location.state]);

  const increaseQuantity = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  };

  const decreaseQuantity = (id) => {
    setProducts(products.map(p => p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalPrice = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);


  console.log(products)
  console.log(products.staffName == undefined ? null : products.staffName)
  // Load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔹 Handle Place Order / Pay Now
  const handlePayment = async () => {
    if (paymentMethod === "cod") {
      // COD → just place order in backend
      try {
      
        setLoading(true);
        const res = await axios.post(
          "https://order-wedj.onrender.com/api/order/add",
          {
            productId: products[0].id,
            quantity: products[0].quantity,
            staffName: products[0].staffName == undefined ? null : products[0].staffName,
            storeName: shop,
            paymentMode: "COD",
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        alert("✅ COD Order Placed! Order ID: " + res.data.id);
        navigate("/profile"); // redirect after success
      } catch (err) {
        console.error("COD order error:", err);
        alert("❌ COD Order Failed!");
      } finally {
        setLoading(false);
      }
    } else {
      // Online Payment → Use Razorpay
      payWithRazorpay();
    }
  };

  const payWithRazorpay = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order in backend
      const orderRes = await axios.post(
        "https://order-wedj.onrender.com/api/order/add",
        {
            productId: products[0].id,
            quantity: products[0].quantity,
            staffName: products[0].staffName == undefined ? null : products[0].staffName,
          storeName: shop,
          paymentMode: "RazorPay",
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const orderData = orderRes.data;
      console.log("Backend Order Data:", orderData);

      // 2️⃣ Razorpay checkout options
      const options = {
        key: "rzp_test_R6lJJgEz7DqYnM", // test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Shop",
        description: "Product Purchase",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify success in backend
            const res = await axios.post(
              "https://order-wedj.onrender.com/api/order/success",
              null,
              {
                params: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
                headers: { Authorization: "Bearer " + token },
              }
            );
            alert("✅ Payment Verified: " + res.data);
            navigate("/");
          } catch (err) {
            alert("❌ Payment verification failed: " + err.response?.data);
          }
        },
        prefill: {
          name: user?.userName || "Customer",
          email: user?.userEmail || "customer@example.com",
          contact: user?.userPhoneNo || "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);

      // Handle failed payments
      rzp.on("payment.failed", async function (response) {
        console.error("Payment Failed:", response);
        try {
          await axios.post(
            "https://order-wedj.onrender.com/api/order/failed",
            null,
            {
              params: { razorpayOrderId: response.error.metadata.order_id },
              headers: { Authorization: "Bearer " + token },
            }
          );
          alert("❌ Payment Failed! Backend updated.");
        } catch (err) {
          alert("❌ Payment Failed! Backend update error.");
        }
      });

      rzp.open();
    } catch (err) {
      console.error("Error in online payment:", err);
      alert("❌ Payment failed to initiate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.title}>Payment</div>

      <div className={styles.paymentContainer}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.contactSection}>
            <h2>Contact</h2>
            <input type="text" placeholder="Enter Phone Number" value={user?.userPhoneNo || ""} readOnly />
          </div>

          <div className={styles.deliverySection}>
            <h2>Delivery</h2>
            <input type="text" placeholder="Country/Region" value="India" readOnly />
            <div className={styles.row}>
              <input type="text" placeholder="First Name" value={user?.userName?.split(" ")[0] || ""} readOnly />
              <input type="text" placeholder="Last Name" value={user?.userName?.split(" ")[1] || ""} readOnly />
            </div>
            <textarea placeholder="Address" value={user?.userAddress || ""} readOnly />
            <input type="text" placeholder="Phone / Whatsapp number" value={user?.userPhoneNo || ""} readOnly />
          </div>

          <div className={styles.paymentSection}>
            <h2>Payment</h2>
            <p>Select your preferred payment method:</p>

            <div className={styles.paymentOptions}>
              <div
                className={`${styles.optionCard} ${paymentMethod === "cod" ? styles.active : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>💵 Cash on Delivery</span>
              </div>

              <div
                className={`${styles.optionCard} ${paymentMethod === "online" ? styles.active : ""}`}
                onClick={() => setPaymentMethod("online")}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span>💳 Online Payment</span>
              </div>
            </div>

            <button className={styles.payNow} onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Pay Now"}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <img
                src={product.img || `https://lh3.googleusercontent.com/d/${product.imageId}=w500-h500-rw`}
                alt={product.name}
              />
              <div className={styles.productDetails}>
                <h3>{product.name}</h3>
                <p>{product.code}</p>
                <p>₹{product.price}</p>
                <div className={styles.quantityControl}>
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
              </div>
              <button className={styles.deleteBtn} onClick={() => deleteProduct(product.id)}>✕</button>
            </div>
          ))}

          <div className={styles.summary}>
            <span>Estimated total</span>
            <span>₹{totalPrice}</span>
          </div>
          <small>Taxes and shipping are calculated at checkout.</small>
        </div>
      </div>
    </>
  );
};

export default Payment;
