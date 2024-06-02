import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert as RNAlert } from 'react-native';
import { getItem, removeItem, setItem } from 'store/storage';
import { Link, useRouter } from 'expo-router';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { Button, ButtonText, ButtonIcon, MailIcon, Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';

interface UserInfo {
    userId: string;
    email: string;
    isVerified: boolean;
}

const Profiel: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userId = await getItem('@user_id');
                const email = await getItem('@user_email');
                const isVerified = await getItem('@email_verified');

                console.log("Email is verified?: " + isVerified);

                if (userId && email && isVerified) {
                    setUserInfo({
                        userId,
                        email,
                        isVerified: JSON.parse(isVerified),
                    });
                }
            } catch (error) {
                console.error('Failed to load user info:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserInfo();
    }, []);

    const sendVerificationEmail = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                await sendEmailVerification(user);
                RNAlert.alert('Verificatie-email Verzonden', 'Controleer je email om je account te verifiëren.');
                console.log("Verificatie-email verzonden");

                await user.reload();
                const refreshedUser = auth.currentUser;
                if (refreshedUser?.emailVerified) {
                    await setItem('@email_verified', JSON.stringify(true));
                    setUserInfo((prev) => prev && { ...prev, isVerified: true });
                }
            } catch (error) {
                console.error('Fout bij het verzenden van de verificatie-email:', error);
                RNAlert.alert('Fout', 'Verzenden van verificatie-email mislukt.');
            }
        } else {
            console.error('Geen geauthenticeerde gebruiker');
            RNAlert.alert('Fout', 'Geen geauthenticeerde gebruiker. Log opnieuw in.');
        }
    };


    const logOutFromApp = async () => {
        try {
            await auth.signOut();
            removeItem('@user_id');
            removeItem('@user_email');
            removeItem('@email_verified');
            removeItem('@access_token');
            removeItem('@refresh_token');
            removeItem('@token_expiration');
            console.log("Successfully logged out!");
            router.replace('(auth)');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainerInfo}>
                <Text style={styles.title}>Profiel</Text>
                {loading ? (
                    <Text>Loading user information...</Text>
                ) : userInfo ? (
                    <View style={styles.userInfoContainer}>
                        <Text>User ID: {userInfo.userId}</Text>
                        <Text>Email: {userInfo.email}</Text>

                        <Alert mx='$2.5' action="info" variant="solid" right={10}>
                            <AlertIcon as={InfoIcon} mr="$3" right={5} />
                            <AlertText right={10}>
                                Email Verified: {userInfo.isVerified ? 'Yes' : 'No'}
                            </AlertText>
                        </Alert>

                        {!userInfo.isVerified && (
                            <Button
                                size='md'
                                variant="solid"
                                action="positive"
                                isDisabled={false}
                                isFocusVisible={false}
                                top={5}
                                onPress={sendVerificationEmail}
                            >
                                <ButtonText textAlign='left' right={65}>Verify email right now</ButtonText>
                                <ButtonIcon as={MailIcon} right={55} />
                            </Button>
                        )}

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
    );
};

export default Profiel;

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
});
