import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { AuthProvider, useAuth } from '~/context/AuthProvider';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';
import { I18nextProvider } from 'react-i18next';


export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AuthLoader />
          </AuthProvider>
          <Toast />
        </I18nextProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider >
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
