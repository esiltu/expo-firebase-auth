import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const AuthIndex = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.header}>Login</Text>
                <Text style={styles.description}>Wel account log in om diensten te zoeken!</Text>
                <Button title="Sign In" color="#6200EE" onPress={() => router.navigate('/sign-in')} />
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Registreren</Text>
                <Text style={styles.description}>Geen account? Registreer nu!</Text>
                <Button title="Sign Up" color="#6200EE" onPress={() => router.navigate('/sign-up')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    section: {
        width: '80%',
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
        color: '#6200EE',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#757575',
    },
});

export default AuthIndex;
