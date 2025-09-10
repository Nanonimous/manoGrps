import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate, useLocation } from "react-router-dom";

// Simple cookie utility to set JWT token
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  document.cookie = cookieString;

  console.log(`Cookie set: ${name}=${value}`);
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // store the page user came from (default = "/")
const from = location.state?.from || "/";

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      const response = await axios.post(
        "https://userenquire-b5sg.onrender.com/api/auth/login",
        {
          userEmail: decoded.email,
          userName: decoded.name,
          userPictureUrl: decoded.picture,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login response:", response.data);

      if (response.data) {
        setCookie("authToken", response.data, 7);
        setIsLoggedIn(true);

        console.log("JWT token stored in cookie successfully");
        alert("Login successful! Redirecting...");
        
        // redirect user back to previous page
        navigate(from, { replace: true });
      } else {
        alert("Login failed: No token received from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie =
      "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    setIsLoggedIn(false);
    console.log("User logged out - cookie cleared");
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="42385796848-vqqit69i8cvtanfitrojjfjmdme03gp4.apps.googleusercontent.com">
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {!isLoggedIn ? (
            <>
              <div className={styles.loginHeader}>
                <h2 className={styles.loginTitle}>Welcome</h2>
                <p className={styles.loginSubtitle}>Sign in or Register</p>
              </div>

              <div className={styles.loginContent}>
                <div className={styles.googleLoginWrapper}>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.log("Login Failed")}
                    theme="outline"
                    size="large"
                    width="100%"
                    disabled={loading}
                  />
                </div>

                {loading && (
                  <div className={styles.loadingMessage}>
                    <p>Signing you in...</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <h2>You are logged in</h2>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
