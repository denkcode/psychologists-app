import { createContext, useEffect, useState, useContext } from "react";
export const AuthContext = createContext();
import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";


export const useAuth = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const onAuthState = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setIsLoading(false)
        } )
        return onAuthState
    }, []);
    return <AuthContext.Provider value={{user, isLoading}}>{children}</AuthContext.Provider>
};

