import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert as RNAlert, TouchableOpacity } from 'react-native';
import { getItem, removeItem, setItem } from 'store/storage';
import { Link, useRouter } from 'expo-router';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

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

    // Send mail to verify user email
    const sendVerificationEmail = async () => {

        // Check currenct user in app
        const user = auth.currentUser;

        if (user) {
            try {
                await sendEmailVerification(user);
                RNAlert.alert('Verification Email Sent', 'Check your email to verify your account.');
                console.log("Verification email sent");

                await user.reload();
                const refreshedUser = auth.currentUser;
                if (refreshedUser?.emailVerified) {
                    await setItem('@email_verified', JSON.stringify(true));
                    setUserInfo((prev) => prev && { ...prev, isVerified: true });
                }
            } catch (error) {
                console.error('Error sending verification email:', error);
                RNAlert.alert('Error', 'Failed to send verification email.');
            }
        } else {
            console.error('No authenticated user');
            RNAlert.alert('Error', 'No authenticated user. Please log in again.');
        }
    };

    // Log out from app func
    const logOutFromApp = async () => {
        try {
            await auth.signOut();

            // Remove items from storage
            removeItem('@user_id');
            removeItem('@user_email');
            removeItem('@email_verified');
            removeItem('@access_token');
            removeItem('@refresh_token');
            removeItem('@token_expiration');
            console.log("Successfully logged out!");

            // Replace screen to segment called (auth)
            router.replace('(auth)');


            // Show custom Toast -> edit based on your own use case
            Toast.show({
                type: 'success',
                text1: 'Sucessfully logged out!',
                text2: 'You have successfully logged out 👋.',
                position: 'top',
            });

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsContainerInfo}>
                <Text style={styles.title}>Profile</Text>
                {loading ? (
                    <Text>Loading user information...</Text>
                ) : userInfo ? (
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userInfoText}>User ID: {userInfo.userId}</Text>
                        <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>

                        <View style={styles.alert}>
                            <MaterialIcons name="info" size={24} color="blue" style={styles.alertIcon} />
                            <Text style={styles.alertText}>
                                Email Verified: {userInfo.isVerified ? 'Yes' : 'No'}
                            </Text>
                        </View>

                        {!userInfo.isVerified && (
                            <TouchableOpacity style={styles.button} onPress={sendVerificationEmail}>
                                <MaterialIcons name="mail" size={20} color="white" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Verify Email Now</Text>
                            </TouchableOpacity>
                        )}

                        <Link href="(auth)" asChild>
                            <TouchableOpacity style={styles.logoutButton} onPress={logOutFromApp}>
                                <MaterialIcons name="logout" size={20} color="white" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Log Out</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#f9f9f9',
    },
    settingsContainerInfo: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    userInfoContainer: {
        marginTop: 16,
    },
    userInfoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    alert: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        padding: 10,
        backgroundColor: '#e7f3fe',
        borderRadius: 5,
    },
    alertIcon: {
        marginRight: 8,
    },
    alertText: {
        fontSize: 16,
        color: '#3178c6',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#FFA726',  // Warm color for the verify button
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#FF431A',  // Warm color for the verify button
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
