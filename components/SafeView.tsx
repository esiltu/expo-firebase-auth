import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

interface SafeViewProps {
    children?: React.ReactNode;
}

const SafeView: React.FC<SafeViewProps> = ({ children }) => {
    return (
        <SafeAreaView>
            {children}
        </SafeAreaView>
    )
}

export default SafeView

const styles = StyleSheet.create({
    SafeView: {
        flex: 1,
        backgroundColor: "white",
    }
})