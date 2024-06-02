import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import HeaderAuth from '~/components/Header';


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