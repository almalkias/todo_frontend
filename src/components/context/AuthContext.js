import { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")
        ? JSON.parse(localStorage.getItem("isLoggedIn"))
        : false
    );
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")
        ? JSON.parse(localStorage.getItem("authToken"))
        : null
    );
    const [userId, setUserId] = useState();

    const login = async (response) => {
        try {
            const token = response.data.auth_token;
            setAuthToken(token);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
        localStorage.setItem("authToken", JSON.stringify(authToken));
    }, [isLoggedIn, authToken]);

    useEffect(() => {
        const fetchUserId = async () => {
            if (isLoggedIn && authToken) {
                try {
                    const response = await axios.get('/auth/users/me/', {
                        headers: {
                            Authorization: `Token ${authToken}`,
                        },
                    });
                    setUserId(response.data.id);
                    console.log('User ID fetched:', response.data.id);
                } catch (error) {
                    console.error('Error fetching user ID:', error);
                }
            }
        };

        fetchUserId();
    }, [authToken, isLoggedIn]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                authToken,
                userId
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};