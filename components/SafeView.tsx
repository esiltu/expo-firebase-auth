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


const styles = StyleSheet.create({
    SafeView: {
        flex: 1,
    }
})