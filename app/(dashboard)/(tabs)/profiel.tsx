import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

interface SettingsOption {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    navigateTo: string;
}

const SettingsOptions: SettingsOption[] = [
    {
        id: 'appIcon',
        title: 'Kies App Icoon',
        icon: 'image-outline',
        navigateTo: 'AppIcon',
    },
    {
        id: 'userInfo',
        title: 'Profiel Inzien',
        icon: 'person-circle-outline',
        navigateTo: 'UserInfo',
    },
    {
        id: 'bestandenFlexWerker',
        title: 'Bestanden Flexwerker',
        icon: 'briefcase-outline',
        navigateTo: 'BestandenWerker',
    },
    {
        id: 'notificiatieService',
        title: 'Notificatie Service',
        icon: 'notifications-outline',
        navigateTo: 'NotificatieService',
    },
];

export default function Profiel() {
    const router = useRouter();

    const handlePress = (navigateTo: string) => {
        router.push(navigateTo);
    };


    const [fontsLoaded, fontError] = useFonts({
        'DynaPuff-Regular': require('assets/fonts/DynaPuff-Regular.ttf')
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const renderItem = ({ item }: { item: SettingsOption }) => (
        <Button style={styles.button} onPress={() => handlePress(item.navigateTo)}>
            <Ionicons name={item.icon} size={24} color="#4F4F4F" />
            <Text style={styles.buttonText}>{item.title}</Text>
        </Button>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTxt}>Profiel overzicht | 👤</Text>
            <FlashList
                data={SettingsOptions}
                renderItem={renderItem}
                estimatedItemSize={55}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#EDEDED',
    },
    buttonText: {
        marginLeft: 15,
        fontSize: 18,
        color: '#4F4F4F',
        fontWeight: '600',
    },
    listContentContainer: {
        paddingBottom: 20,
        paddingTop: 10,
    },
    headerTxt: {
        fontSize: 25,
        color: '#0D0D26',
        textAlign: 'left',
        left: '5%',
        fontFamily: 'DynaPuff-Regular',
    },
});










// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, Alert as RNAlert } from 'react-native';
// import { getItem, removeItem, setItem } from 'store/storage';
// import { Link, useRouter } from 'expo-router';
// import { sendEmailVerification } from 'firebase/auth';
// import { auth } from 'utils/firebase';
// import { Button, ButtonText, ButtonIcon, MailIcon, Alert, AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';

// interface UserInfo {
//     userId: string;
//     email: string;
//     isVerified: boolean;
// }

// const Profiel: React.FC = () => {
//     const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     const router = useRouter();

//     useEffect(() => {
//         async function fetchUserInfo() {
//             try {
//                 const userId = await getItem('@user_id');
//                 const email = await getItem('@user_email');
//                 const isVerified = await getItem('@email_verified');

//                 console.log("Email is verified?: " + isVerified);

//                 if (userId && email && isVerified) {
//                     setUserInfo({
//                         userId,
//                         email,
//                         isVerified: JSON.parse(isVerified),
//                     });
//                 }
//             } catch (error) {
//                 console.error('Failed to load user info:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchUserInfo();
//     }, []);

//     const sendVerificationEmail = async () => {
//         const user = auth.currentUser;

//         if (user) {
//             try {
//                 await sendEmailVerification(user);
//                 RNAlert.alert('Verificatie-email Verzonden', 'Controleer je email om je account te verifiëren.');
//                 console.log("Verificatie-email verzonden");

//                 await user.reload();
//                 const refreshedUser = auth.currentUser;
//                 if (refreshedUser?.emailVerified) {
//                     await setItem('@email_verified', JSON.stringify(true));
//                     setUserInfo((prev) => prev && { ...prev, isVerified: true });
//                 }
//             } catch (error) {
//                 console.error('Fout bij het verzenden van de verificatie-email:', error);
//                 RNAlert.alert('Fout', 'Verzenden van verificatie-email mislukt.');
//             }
//         } else {
//             console.error('Geen geauthenticeerde gebruiker');
//             RNAlert.alert('Fout', 'Geen geauthenticeerde gebruiker. Log opnieuw in.');
//         }
//     };


//     const logOutFromApp = async () => {
//         try {
//             await auth.signOut();
//             removeItem('@user_id');
//             removeItem('@user_email');
//             removeItem('@email_verified');
//             removeItem('@access_token');
//             removeItem('@refresh_token');
//             removeItem('@token_expiration');
//             console.log("Successfully logged out!");
//             router.replace('(auth)');
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.settingsContainerInfo}>
//                 <Text style={styles.title}>Profiel</Text>
//                 {loading ? (
//                     <Text>Loading user information...</Text>
//                 ) : userInfo ? (
//                     <View style={styles.userInfoContainer}>
//                         <Text>User ID: {userInfo.userId}</Text>
//                         <Text>Email: {userInfo.email}</Text>

//                         <Alert mx='$2.5' action="info" variant="solid" right={10}>
//                             <AlertIcon as={InfoIcon} mr="$3" right={5} />
//                             <AlertText right={10}>
//                                 Email Verified: {userInfo.isVerified ? 'Yes' : 'No'}
//                             </AlertText>
//                         </Alert>

//                         {!userInfo.isVerified && (
//                             <Button
//                                 size='md'
//                                 variant="solid"
//                                 action="positive"
//                                 isDisabled={false}
//                                 isFocusVisible={false}
//                                 top={5}
//                                 onPress={sendVerificationEmail}
//                             >
//                                 <ButtonText textAlign='left' right={65}>Verify email right now</ButtonText>
//                                 <ButtonIcon as={MailIcon} right={55} />
//                             </Button>
//                         )}

//                         <Link href="(auth)" asChild>
//                             <Button
//                                 size='md'
//                                 variant="solid"
//                                 action="negative"
//                                 isDisabled={false}
//                                 isFocusVisible={false}
//                                 top={5}
//                                 marginTop={5}
//                                 onPress={logOutFromApp}
//                             >
//                                 <ButtonText textAlign='left' right={130}>Log out?</ButtonText>
//                             </Button>
//                         </Link>
//                     </View>
//                 ) : (
//                     <Text>No user information found.</Text>
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// };

// export default Profiel;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: 'white',
//     },
//     settingsContainerInfo: {
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     userInfoContainer: {
//         marginTop: 16,
//     },
// });
