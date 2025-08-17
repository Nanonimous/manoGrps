import React from 'react';
import styles from './Payment.module.css';

const Payment = () => {
    return (
        <div className={styles.paymentContainer}>
            <h1>Payment</h1>
            <div className={styles.contactSection}>
                <h2>Contact</h2>
                <input type="text" placeholder="Enter Phone Number / E-mail id:" />
            </div>
            <div className={styles.deliverySection}>
                <h2>Delivery</h2>
                <input type="text" placeholder="Country/Region" />
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <textarea placeholder="Address"></textarea>
                <input type="text" placeholder="City" />
                <input type="text" placeholder="State" />
                <input type="text" placeholder="Pin code" />
                <input type="text" placeholder="Phone / Whatsapp number" />
            </div>
            <div className={styles.paymentSection}>
                <h2>Payment</h2>
                <p>All transactions are secure and encrypted.</p>
                <input type="text" placeholder="Razorpay Secure (UPI, Cards, Wallets, NetBanking)" />
                <p>After clicking "Pay now", you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
                <button>Pay Now</button>
            </div>
        </div>
    );
};

export default Payment;
