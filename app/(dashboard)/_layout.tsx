import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function DashboardLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarActiveTintColor: '#f3a683',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="diensten"
                options={{
                    title: "Diensten",
                    tabBarActiveTintColor: '#f3a683',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="clipboard-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarActiveTintColor: '#f3a683',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-outline" color={color} />,
                }}
            />
        </Tabs>
    )
}