import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SafeView from '~/components/SafeView'

export default function Dashboard() {
    return (
        <SafeView>
            <View>
                <Text>Hello welcome on the Dashboard page!</Text>
            </View>
        </SafeView>
    )
}



const styles = StyleSheet.create({})