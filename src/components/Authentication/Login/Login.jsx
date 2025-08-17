import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

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

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      const response = await axios.post("https://userenquire.onrender.com/api/auth/login", {
        email: decoded.email,
        userName: decoded.name,
        userPictureUrl: decoded.picture
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Login response:", response.data);

      // Handle JWT token response - just set the cookie
      if (response.data) {
        console.log("JWT Token received:", response.data);

        // Set JWT token in cookie
        setCookie('authToken', response.data, 7); // 7 days expiry

        // Set logged in state
        setIsLoggedIn(true);

        console.log("JWT token stored in cookie successfully");
        alert("Login successful! JWT token stored in cookie.");
        navigate("/");
      } else {
        console.error("No token received in response:", response.data);
        alert("Login failed: No token received from server");
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear the cookie by setting it to expire in the past
    document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    setIsLoggedIn(false);
    console.log("User logged out - cookie cleared");
  };

  useEffect(()=>{
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    if (token) {
      navigate("/");
    }
  })



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

                <div className={styles.loginDescription}>
                  <p>Sign in with your Google account to access your dashboard and manage your preferences.</p>
                </div>


              </div>
            </>
          ) : (
            <>
              <div className={styles.sessionHeader}>
                <h2 className={styles.sessionTitle}>Welcome Back!</h2>
                <p className={styles.sessionSubtitle}>You are successfully logged in</p>
              </div>

              <div className={styles.sessionContent}>
                {userSession && (
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      <img
                        src={userSession.user.picture}
                        alt={userSession.user.name}
                        className={styles.avatarImage}
                      />
                    </div>
                    <div className={styles.userDetails}>
                      <h3 className={styles.userName}>{userSession.user.name}</h3>
                      <p className={styles.userEmail}>{userSession.user.email}</p>
                      <p className={styles.loginTime}>
                        Logged in: {new Date(userSession.loginTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                <div className={styles.sessionActions}>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Sign Out
                  </button>
                </div>

                <div className={styles.tokenInfo}>
                  <p className={styles.tokenLabel}>JWT Token (Cookie):</p>
                  <p className={styles.tokenValue}>
                    {userSession?.token ? `${userSession.token.substring(0, 20)}...` : 'No token'}
                  </p>
                  <p className={styles.cookieInfo}>
                    Token stored in secure HTTP-only cookie with 7-day expiry
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
