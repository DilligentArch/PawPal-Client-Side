import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config"
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const axiosSecure=useAxiosSecure();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Handle Google Sign-In
  const handleSignInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Reset Password Function
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Create New User
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // User Login
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update User Profile
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Logout User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Monitor Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        axiosSecure
          .post("/users", {
            name: currentUser?.displayName || "Anonymous",
            image: currentUser?.photoURL || "https://via.placeholder.com/150",
            email: currentUser?.email,
            isAdmin: false,
          })
          .then((response) => {
            if (response.data.message === "User already exists") {
              // console.log("User already exists in the database.");
            } else {
              // console.log("User added to the database successfully.");
            }
          })
          .catch((error) => {
            // console.error("Error saving user to the database:", error);
          });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Context Value
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    userLogin,
    updateUserProfile,
    logOut,
    handleSignInWithGoogle,
    resetPassword, // Added resetPassword to context
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;