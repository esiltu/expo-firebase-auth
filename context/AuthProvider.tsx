import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getItem } from 'store/storage';
import { useRouter } from 'expo-router';


// Create Auth Context
const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const userId = getItem('@user_id');
            const accessToken = getItem('@access_token');

            if (userId && accessToken) {
                setIsAuthenticated(true);
                router.navigate('(dashboard)')
            } else {
                setIsAuthenticated(false);
                router.navigate('(auth)')
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
