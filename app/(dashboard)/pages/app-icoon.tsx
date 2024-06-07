import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';
import { Ionicons } from '@expo/vector-icons';


// Your custom icons .. 🔎😎
// Default = standard app icon 
const ICONS = [
    {
        name: 'default',
        icon: require('assets/app-icons/icon-1.png'),
    },
    {
        name: 'optional',
        icon: require('assets/app-icons/icon-2.png'),
    },
    {
        name: 'fancy',
        icon: require('assets/app-icons/icon-3.png'),
    },
];

const { width } = Dimensions.get('window');
const iconSize = width * 0.15;

const ChooseAppIcon: React.FC = () => {
    const [activeIcon, setActiveIcon] = useState('default');

    useEffect(() => {
        const loadCurrentIcon = async () => {
            const icon = await getAppIcon();
            setActiveIcon(icon);
        };
        loadCurrentIcon();
    }, []);

    async function onChangeAppIcon(iconName: string) {
        await setAppIcon(iconName);
        setActiveIcon(iconName);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={styles.container}>
                <Text style={styles.header}>Choose App Icon</Text>
                <View style={styles.iconContainer}>
                    {ICONS.map((icon) => (
                        <TouchableOpacity
                            key={icon.name}
                            style={[styles.btn, activeIcon === icon.name ? styles.activeBtn : null]}
                            onPress={() => onChangeAppIcon(icon.name)}
                        >
                            <Image
                                source={icon.icon}
                                style={[styles.iconImage, { width: iconSize, height: iconSize }]}
                            />
                            <Text style={styles.iconText}>{icon.name}</Text>
                            {activeIcon === icon.name && (
                                <Ionicons name="checkmark-circle" size={24} style={styles.checkmark} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ChooseAppIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        bottom: '20%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        bottom: '7%',
    },
    iconContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E6E6E6',
        backgroundColor: 'white',
    },
    activeBtn: {
        borderColor: '#5669FF',
    },
    iconImage: {
        resizeMode: 'contain',
    },
    iconText: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontSize: 16,
    },
    checkmark: {
        marginRight: 15,
        color: '#5669FF',
    },
    goBackButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        left: '4%',
    },
});
