import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth, AuthProvider } from '~/context/AuthProvider';
import { GluestackUIProvider } from '@gluestack-ui/themed'


export default function RootLayout() {

  // Check from the AuthProvider whether user has an account or not? 
  const { isAuthenticated } = useAuth()

  return (
    <GluestackUIProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} redirect={!isAuthenticated} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}