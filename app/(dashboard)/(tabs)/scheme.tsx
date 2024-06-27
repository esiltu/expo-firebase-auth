import { Text, SafeAreaView, StyleSheet } from 'react-native';


export default function Scheme() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Scheme page..</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})