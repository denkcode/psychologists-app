import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const logoutUser = async () => {
    await signOut(auth);
    window.dispatchEvent(new Event("auth-logout"));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
