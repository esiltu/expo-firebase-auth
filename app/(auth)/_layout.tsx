import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="sign-in" />
        </Stack>
    );
}
