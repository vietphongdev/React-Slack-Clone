import { Spin } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/config";
import { addDocument, generateKeywords } from "../firebase/services";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscibed = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push("/");
      } else {
        setUser({});
        setIsLoading(false);
        history.push("/login");
      }
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  const login = async (provider) => {
    const { additionalUserInfo, user } = await firebase
      .auth()
      .signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Spin style={{ position: "fixed", inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
