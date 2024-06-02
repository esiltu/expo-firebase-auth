import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem } from 'store/storage';
import { useRouter } from 'expo-router';


const AuthContext = createContext<{ isAuthenticated: boolean | null }>({ isAuthenticated: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userId = await getItem('@user_id');
            const accessToken = await getItem('@access_token');

            if (userId && accessToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated !== null) {
            if (isAuthenticated) {
                router.replace('(dashboard)');
            } else {
                router.replace('(auth)');
            }
        }
    }, [isAuthenticated, router]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
