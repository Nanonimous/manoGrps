import React, { useState } from "react";

const PaymentTest = () => {
  const [amount, setAmount] = useState("");

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 📌 Call your backend API to create an order
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }), // amount entered in form
    });

    
    const order = await response.json();
    console.log(order);

    // 📌 Razorpay Checkout Options
    const options = {
      key: "rzp_test_R6lJJgEz7DqYnM", // Replace with your test key
      amount: order.amount,
      currency: order.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        console.log("Payment Response:", response);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Razorpay Payment Gateway Integration</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          payNow();
        }}
      >
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentTest;
