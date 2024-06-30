import { Text, SafeAreaView, StyleSheet } from 'react-native';


export default function Jobs() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Jobs page..</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})