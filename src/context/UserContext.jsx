import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getAuthToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="));
    return cookie ? cookie.split("=")[1] : null;
  };

  const [token, setToken] = useState(getAuthToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (currentToken = token) => {
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        "https://userenquire-b5sg.onrender.com/api/user/email",
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      setUser({
        ...res.data,
        profileImageUrl:
          res.data.userImageId || res.data.profileImageUrl || null,
      });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const freshToken = getAuthToken();
    setToken(freshToken);
    fetchUser(freshToken);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, loading, token }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
