import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const AuthIndex = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Expo Firebase Auth</Text>
                <Text style={styles.subtitle}>with TypeScript and Expo Router</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Login</Text>
                <Text style={styles.description}>Welcome! Log in to access our services.</Text>
                <Button title="Sign In" color="#FF7043" onPress={() => router.navigate('/sign-in')} />
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Register</Text>
                <Text style={styles.description}>Don't have an account? Sign up now!</Text>
                <Button title="Sign Up" color="#FF7043" onPress={() => router.navigate('/sign-up')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796B',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#00796B',
        textAlign: 'center',
    },
    section: {
        width: '90%',
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00796B',
        textAlign: 'left',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#607D8B',
        textAlign: 'left',
    },
});

export default AuthIndex;
