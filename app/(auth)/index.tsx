import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const AuthIndex = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>Welcome to the Auth Flow</Text>
                <Link href="/sign-in">
                    <Button title="Sign In" />
                </Link>
                <Link href="/sign-up">
                    <Button title="Sign Up" />
                </Link>
            </View>
        </SafeAreaView>
    );
}

export default AuthIndex