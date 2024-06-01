import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { getItem, removeItem, storage, } from 'store/storage'
import { Link, useRouter } from 'expo-router'
import { useAuth } from 'context/AuthProvider'
import { Badge, BadgeText, Button, ButtonText, ButtonIcon, MailIcon, Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed'


interface UserInfo {
    userId: string;
    email: string;
    isVerified: boolean;
}

const Settings: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const router = useRouter();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userId = await getItem('@user_id')
                const email = await getItem('@user_email')
                const isVerified = await getItem('@email_verified')

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

    function logOutFromApp() {
        try {
            removeItem('@user_id'),
                removeItem('@user_email'),
                removeItem('@email_verified'),
                removeItem('@access_token'),
                removeItem('@refresh_token'),
                removeItem('@token_expiration'),
                console.log("Successfully logged out!")
            router.replace('(auth)')
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainerInfo}>
                <Text style={styles.title}>Settings</Text>
                {loading ? (
                    <Text>Loading user information...</Text>
                ) : userInfo ? (
                    <View style={styles.userInfoContainer}>
                        <Text>User ID: {userInfo.userId}</Text>
                        <Text>Email: {userInfo.email}</Text>

                        <Alert mx='$2.5' action="info" variant="solid" right={10} >
                            <AlertIcon as={InfoIcon} mr="$3" right={5} />
                            <AlertText right={10}>
                                Email Verified:  {userInfo.isVerified ? 'Yes' : 'No'}
                            </AlertText>
                        </Alert>

                        <Button
                            size='md'
                            variant="solid"
                            action="positive"
                            isDisabled={false}
                            isFocusVisible={false}
                            top={5}
                            onPress={() => console.log("Pressed on me")}
                        >
                            <ButtonText textAlign='left' right={65}>Verify email right now</ButtonText>
                            <ButtonIcon as={MailIcon} right={55} />
                        </Button>

                        <Link href="(auth)" asChild>
                            <Button
                                size='md'
                                variant="solid"
                                action="negative"
                                isDisabled={false}
                                isFocusVisible={false}
                                top={5}
                                marginTop={5}
                                onPress={logOutFromApp}
                            >
                                <ButtonText textAlign='left' right={130}>Log out?</ButtonText>
                            </Button>
                        </Link>

                    </View>
                ) : (
                    <Text>No user information found.</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    settingsContainerInfo: {
        padding: 16,
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
