import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { getItem } from '~/store/storage';

interface UserInformation {
    email: string;
}

export default function HeaderAuth() {
    const [userInfo, setUserInfo] = useState<UserInformation | null>(null);

    const [fontsLoaded, fontError] = useFonts({
        'DynaPuff-Regular': require('assets/fonts/DynaPuff-Regular.ttf')
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    useEffect(() => {
        async function getUserInfo() {
            try {
                const email = (await getItem('@user_email')) || '';
                setUserInfo({ email });
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTxt}>Welcome back!</Text>
            <Text style={styles.headerSecondTxt}>{userInfo?.email} 🤝</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        top: '4%',
        width: '95%',
        left: '4%',
    },
    headerTxt: {
        fontSize: 19,
        fontWeight: '400',
        color: '#95969D',
        left: '2%',
        fontFamily: 'DynaPuff-Regular',
    },
    headerSecondTxt: {
        top: '5%',
        fontSize: 23,
        color: '#0D0D26',
        fontWeight: '500',
        left: '2%',
        fontFamily: 'DynaPuff-Regular',
    },
    profilePic: {
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        bottom: '45%',
        right: '5%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 50,
    },
});
