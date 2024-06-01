import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getItem } from 'store/storage'


import SafeView from '~/components/SafeView'

interface UserInfo {
    userId: string;
    email: string;
    isVerified: boolean;
}

const Settings: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userId = await getItem('@user_id')
                const email = await getItem('@user_email')
                const isVerified = await getItem('@email_verified')

                console.log('User Info:', { userId, email, isVerified })

                if (userId && email && isVerified) {
                    setUserInfo({
                        userId,
                        email,
                        isVerified: JSON.parse(isVerified)
                    })
                }
            } catch (error) {
                console.error('Failed to load user info:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserInfo()
    }, [])

    return (
        <SafeView>
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                {loading ? (
                    <Text>Loading user information...</Text>
                ) : userInfo ? (
                    <View style={styles.userInfoContainer}>
                        <Text>User ID: {userInfo.userId}</Text>
                        <Text>Email: {userInfo.email}</Text>
                        <Text>Email Verified: {userInfo.isVerified ? 'Yes' : 'No'}</Text>
                    </View>
                ) : (
                    <Text>No user information found.</Text>
                )}
            </View>
        </SafeView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    userInfoContainer: {
        marginTop: 16,
    },
})
