import { View, Text, SafeAreaView, StyleSheet } from 'react-native';



export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello !</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})