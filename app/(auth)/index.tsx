import React, { useState } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, Image, Alert, Platform, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import i18n from "~/hooks/useTranslation";
import * as Updates from 'expo-updates';

export default function AuthIndex() {

    const router = useRouter();

    // useTranslation hook descruction
    const { t } = i18n;

    // Custom hooks for i18n
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [modalVisible, setModalVisible] = useState(false);

    const changeLanguage = (lng: string) => {
        setSelectedLanguage(lng);
        i18n.changeLanguage(lng);
        setModalVisible(false);
        const language = lng === 'en' ? 'English' : 'Dutch';
        Alert.alert(
            "Language Changed",
            `The language has been changed to ${language}. Please restart the app for the changes to take effect.`,
            [
                {
                    text: "Restart Now",
                    onPress: () => {
                        Updates.reloadAsync();
                    },
                },
                { text: "Later" },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.languageContainer} onPress={() => setModalVisible(true)}>
                    <Image
                        source={
                            selectedLanguage === 'en'
                                ? require('assets/flags/locale-english-flag.png')
                                : require('assets/flags/locale-dutch-flag.png')
                        }
                        style={styles.flag}
                    />
                    <Text style={styles.languageText}>
                        {selectedLanguage === 'en' ? 'English' : 'Dutch'} 🌐
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalItem} onPress={() => changeLanguage('en')}>
                            <Image source={require('assets/flags/locale-english-flag.png')} style={styles.modalFlag} />
                            <Text style={styles.modalText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => changeLanguage('nl')}>
                            <Image source={require('assets/flags/locale-dutch-flag.png')} style={styles.modalFlag} />
                            <Text style={styles.modalText}>Dutch</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.content}>
                <Text style={styles.title}>{t('home-title')}</Text>
                <Text style={styles.subtitle}>{t('home-subtitle')}</Text>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>{t('home-login-text')}</Text>
                    <Text style={styles.cardDescription}>{t('home-login-description-text')}</Text>
                    <Button title={t('home-login-text')} color="#FF7043" onPress={() => router.navigate('/sign-in')} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>{t('home-register-text')}</Text>
                    <Text style={styles.cardDescription}>{t('home-register-description-text')}</Text>
                    <Button title={t('home-register-text')} color="#FF7043" onPress={() => router.navigate('/sign-up')} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    flag: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    languageText: {
        fontSize: 16,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 250,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    modalFlag: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    modalText: {
        fontSize: 18,
        color: '#000',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF7043',
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#FF7043',
        textAlign: 'center',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#FFF3E0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
    },
    cardHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF7043',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 20,
        textAlign: 'center',
    },
});