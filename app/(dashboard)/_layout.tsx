import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

const DrawerLayout = () => (
    <Drawer>
        <Drawer.Screen
            name="(tabs)"
            options={{
                headerTitle: "",
                drawerLabel: 'Home',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="pages/app-icoon"
            options={{
                headerTitle: "",
                drawerLabel: 'Choose App Icon',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="brush-outline" size={size} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="pages/bestanden-flex"
            options={{
                headerTitle: "",
                drawerLabel: 'Files Flex',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="document-outline" size={size} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="pages/profiel-inzien"
            options={{
                headerTitle: "",
                drawerLabel: 'View Profile',
                drawerIcon: ({ size, color }) => (
                    <Ionicons name="person-circle-outline" size={size} color={color} />
                ),
            }}
        />
    </Drawer>
);

export default DrawerLayout;
