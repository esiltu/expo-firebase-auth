import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

// Components
import { HeaderAuth } from 'components/export';


export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})