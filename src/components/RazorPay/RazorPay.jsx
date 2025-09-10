import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const token = "Jwt Token";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    try {
      setLoading(true);

      // Create order in backend
      const response = await axios.post(
        "https://order-wedj.onrender.com/api/order/add",
        {
          productId: 10,
          quantity: 2,
          staffName: "surya",
          storeName: "Lit tots",
          paymentMode: "RazorPay",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const orderData = response.data;
      console.log("Backend Order Data:", orderData);

      const options = {
        key: "rzp_test_R6lJJgEz7DqYnM",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Shop",
        description: "Product Purchase",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const res = await axios.post(
              "https://order-wedj.onrender.com/api/order/success",
              null,
              {
                params: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            alert("✅ Payment Verified: " + res.data);
          } catch (err) {
            alert("❌ Payment verification failed: " + err.response?.data);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);

      // Payment failed handler
      rzp.on("payment.failed", async function (response) {
        console.error("Payment Failed:", response);

        // Call backend failed API
        try {
          const failedRes = await axios.post(
            "https://order-wedj.onrender.com/api/order/failed",
            null,
            {
              params: {
                razorpayOrderId: response.error.metadata.order_id,
              },
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          alert("❌ Payment Failed! Backend updated: " + failedRes.data);
        } catch (err) {
          alert(
            "❌ Payment Failed! Backend update error: " +
              err.response?.data
          );
        }
      });

      rzp.open();
    } catch (error) {
      console.error("Error in createOrder:", error);
      alert("Order creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      <button onClick={createOrder} disabled={loading}>
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
}


