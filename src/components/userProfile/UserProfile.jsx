import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser, fetchUser,token } = useUser();
  const navigate = useNavigate();
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userPhoneNo: "",
    userAddress: "",
    profileImageUrl: null, // backend sends URL here
  });

  const [originalData, setOriginalData] = useState(formData);
  const [isChanged, setIsChanged] = useState(false);

  const [userImageFile, setUserImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [shopName , setShopName] = useState("Lit tots");
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const limit = 20;

  // Fetch user data
  useEffect(() => {
    if (user) {
      setFormData(user);
      setOriginalData(user);
      setPreview(user.profileImageUrl);
    }
  }, [user]);

  // Sync image preview
  useEffect(() => {
    if (userImageFile) {
      const objectUrl = URL.createObjectURL(userImageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData.profileImageUrl) {
      setPreview(formData.profileImageUrl);
    } else {
      setPreview("");
    }
  }, [userImageFile, formData.profileImageUrl]);

  // Detect changes
  useEffect(() => {
    const formChanged =
      formData.userName !== originalData.userName ||
      formData.userPhoneNo !== originalData.userPhoneNo ||
      formData.userAddress !== originalData.userAddress;

    const imageChanged =
      userImageFile !== null ||
      formData.profileImageUrl !== originalData.profileImageUrl;

    setIsChanged(formChanged || imageChanged);
  }, [formData, originalData, userImageFile]);

  // Fetch Orders
// Fetch Orders
const fetchOrders = async () => {
  try {
    setLoadingOrders(true); // ⏳ start loader
    const res = await axios.get(
      `https://order-wedj.onrender.com/api/order/orders?storeName=${shopName}&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Orders API response:", res.data);
    setOrders(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Failed to fetch orders", err);
  } finally {
    setLoadingOrders(false); // ✅ stop loader
  }
};

  // Fetch Orders Count
  const fetchTotalCount = async () => {
    try {
      const res = await axios.get(
        `https://order-wedj.onrender.com/api/order/user/count?storeName=${shopName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTotalCount(res.data || 0);
    } catch (err) {
      console.error("Failed to fetch total count", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTotalCount();
  }, [page, shopName]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUserImageFile(file);
  };

  const handleClearImage = () => {
    setUserImageFile(null);
    setPreview("");
    setFormData((p) => ({ ...p, profileImageUrl: null }));
    setFileInputKey((k) => k + 1);
  };
  const [loading, setLoading] = useState(false);

  // Optimistic submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = new FormData();
      const { profileImageUrl, ...rest } = formData;
      const userSendData = 
      {
        userName : rest.userName,
        userPhoneNo : rest.userPhoneNo,
        userAddress:rest.userAddress,
      }
      data.append("user", JSON.stringify(userSendData));
      console.log(user)
      if (userImageFile) data.append("image", userImageFile);
      await axios.put(
        "https://userenquire-b5sg.onrender.com/api/user/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchUser();
      setUserImageFile(null);
      setIsChanged(false);
    } catch (err) {
      console.error("Update failed", err);
      setIsChanged(true);
    } finally {
      setIsSaving(false);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  const handleOrderCancel = async (id) => {
  try {
    const res = await axios.delete(
      `https://order-wedj.onrender.com/api/order/cancel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    // Correctly update orders
    setOrders((prev) => prev.map((order) => order.orderId == id ?{ ...order , orderMessage: "Order was cancelled by You" }:order));
  } catch (err) {
    console.error("Failed to cancel order", err);
  }
};

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

  const payWithRazorpay = async (product) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      setLoading(true);
      console.log("Backend Order Data:", product);

      // 2️⃣ Razorpay checkout options
      const options = {
        key: "rzp_test_R6lJJgEz7DqYnM", // test key
        amount: product.amount,
        currency: "INR",
        name: "My Shop",
        description: "Product Purchase",
        order_id: product.razorpayOrderId,
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
    <div className={styles.container}>
      <h1 className={styles.title}>My Account</h1>
      <p className={styles.welcome}>
        Welcome back, {formData.userName || "User"}
      </p>

      <div className={styles.sections}>
        {/* ===== Orders ===== */}
        <div className={styles.section}>
          <h3>My Orders</h3>
          <hr />

          <div className={styles.controls}>
            <label>ShopName</label>
            <select
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
                setPage(1);
              }}
              className={styles.shopDropdown}
            >
              <option value="Lit tots">Lit tots</option>
              <option value="wowla">wowla</option>
              <option value="manostore">manostore</option>
            </select>
          </div>

         {loadingOrders ? (
            <p className={styles.loader}>Loading orders...</p>
          ) : orders?.length ? (
          <ul className={styles.ordersList}>
            {orders.map((o, index) => (
              <li key={o.orderId} className={styles.orderItem}>
                {/* Product Image on Left */}
                {o.productImageId?.[0] && (
                  <div className={styles.orderImageWrapper}>
                    <img
                      src={`https://lh3.googleusercontent.com/d/${o.productImageId[0]}=w1000-h1000-rw`}
                      alt={`Product for Order #${index + 1}`}
                      className={styles.orderImage}
                    />
                  </div>
                )}

                {/* Order Content */}
                <div className={styles.orderContent}>
                  <div className={styles.orderHeader}>
                    <span>Order #{index + 1}</span>
                    <span
                      className={`${styles.status} ${
                        styles[`status--${(o.status || "").toLowerCase()}`] || ""
                      }`}
                    >
                      {o.orderMessage}
                    </span>
                  </div>

                  <div className={styles.orderMeta}>
                    <span>{o.date}</span>
                    <span>Items: {o.quantity}</span>
                    <span>Payment Mode: {o.paymentMode}</span>
                    <span>Total: ₹{o.amount}</span>
                  </div>

                  <div className={styles.orderActions}>
                    <button
                      className={styles.viewOrderBtn}
                      onClick={() => navigate(`/${shopName}/products/${o.category}?id=${o.productId}`)}
                    >
                      View Product
                    </button>

                    {o.orderStatus == "WAITING" &&
                    (
                      <button
                      className={styles.deleteBtn}
                      onClick={() => payWithRazorpay(o)}
                    >
                      Complete Payment
                    </button>
                    )}

                    {o.orderMessage != "Order was cancelled by You" && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleOrderCancel(o.orderId)}
                    >
                      Cancel
                    </button>
                    )}
                    
                  </div>
                </div>
              </li>
            ))}
          </ul>
          ) : (
            <p className={styles.emptyState}>
              You haven’t placed any orders yet.
            </p>
          )}


          {/* Pagination only if more than 1 page */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((p) => (p < totalPages ? p + 1 : p))
                }
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* ===== User Info ===== */}
        <div className={styles.section}>
          <h3>User Information</h3>
          <hr />
          <form onSubmit={handleEditSubmit} className={styles.form}>
            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={formData.userName ?? ""}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              name="userPhoneNo"
              placeholder="Phone Number*"
              value={formData.userPhoneNo ?? ""}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <input
              type="text"
              name="userAddress"
              placeholder="Address"
              value={formData.userAddress ?? ""}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <div className={styles.imageUpload}>
              <label className={styles.imageLabel}>Upload Profile Image:</label>
              <input
                key={fileInputKey}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
              {preview && (
                <div className={styles.previewWrapper}>
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className={styles.clearBtn}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isChanged || isSaving}
              className={`${styles.submitBtn} ${
                !isChanged || isSaving ? styles.disabled : ""
              }`}
            >
              {isSaving ? "Saving..." : "Save Details"}
            </button>

            <p className={styles.mandatoryNote}>Mandatory data (*)</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
