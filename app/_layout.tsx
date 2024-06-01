import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { AuthProvider, useAuth } from '~/context/AuthProvider';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AuthLoader />
        </AuthProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}

const AuthLoader: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
};