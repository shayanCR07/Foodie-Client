import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= AUTH METHODS =================

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUpWithgmail = () =>
    signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });

  // ================= AUTH STATE LISTENER =================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);

        try {
          const { data } = await axios.post(
            "http://localhost:6001/jwt",
            { email: currentUser.email }
          );

          if (data?.token) {
            localStorage.setItem("access-token", data.token);
          }
        } catch (error) {
          console.error("JWT error:", error);
        }

      } else {
        setUser(null); // 🔑 THIS FIXES PROFILE PIC ISSUE
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ================= CONTEXT VALUE =================

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    signUpWithgmail,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
