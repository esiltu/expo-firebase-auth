import { Stack, Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth, AuthProvider } from '~/context/AuthProvider';
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config';
import { getItem } from '~/store/storage';


export default function RootLayout() {

  // Check from the AuthProvider whether user has an account or not? 
  const { isAuthenticated } = useAuth()

  const logItem = getItem('@user_id',)
  console.log(logItem)

  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} redirect={!isAuthenticated} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} redirect={isAuthenticated} />
          </Stack>
        </AuthProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}