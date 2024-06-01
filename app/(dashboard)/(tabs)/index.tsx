import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

import SafeView from '~/components/SafeView';

export default function Home() {
  return (
    <SafeView>
      <View>
        <Text>Hello !</Text>
      </View>
    </SafeView>
  );
}
