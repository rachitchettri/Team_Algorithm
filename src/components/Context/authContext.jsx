import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tracks initial authentication state loading
  const [auth, setAuth] = useState(null); // Firebase Auth instance
  const [appId, setAppId] = useState(''); // Stores the __app_id

  useEffect(() => {
    // Initialize Firebase and set up authentication
    const setupFirebase = async () => {
      try {
        // Retrieve global variables provided by the environment
        const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ?
          JSON.parse(__firebase_config) :
          {}; // Fallback for local development

        setAppId(currentAppId);

        if (Object.keys(firebaseConfig).length === 0) {
          console.error("Firebase config not found. Firebase will not be initialized.");
          setLoading(false);
          return;
        }

        const app = initializeApp(firebaseConfig);
        const firebaseAuth = getAuth(app);
        setAuth(firebaseAuth); // Store auth instance in state

        // Sign in with custom token if available, otherwise anonymously
        if (typeof __initial_auth_token !== 'undefined') {
          await signInWithCustomToken(firebaseAuth, __initial_auth_token);
        } else {
          await signInAnonymously(firebaseAuth);
        }

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
          setCurrentUser(user);
          setLoading(false); // Authentication state is now loaded
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Failed to initialize Firebase or sign in:", error);
        setLoading(false);
      }
    };

    setupFirebase();
  }, []); // Run once on component mount

  // Firebase Authentication Functions
  const register = async (email, password) => {
    if (!auth) {
      console.error("Firebase Auth not initialized.");
      return null;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error registering:", error);
      throw error; // Re-throw to be handled by the component
    }
  };

  const login = async (email, password) => {
    if (!auth) {
      console.error("Firebase Auth not initialized.");
      return null;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Re-throw to be handled by the component
    }
  };

  const logout = async () => {
    if (!auth) {
      console.error("Firebase Auth not initialized.");
      return;
    }
    try {
      await signOut(auth);
      // Optionally sign in anonymously after logout if the app requires an active user session
      // await signInAnonymously(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // Helper to get the user ID for Firestore paths (public or private)
  const getUserId = () => {
    return currentUser ? currentUser.uid : (typeof crypto !== 'undefined' ? crypto.randomUUID() : 'anonymous');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading, // Provide loading state
    appId, // Provide appId for Firestore path construction
    getUserId, // Provide a utility to get the user ID
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after auth state is loaded */}
    </AuthContext.Provider>
  );
};
