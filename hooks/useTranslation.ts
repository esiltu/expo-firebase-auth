import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from 'assets/locales/english/translation.json';
import nl from 'assets/locales/dutch/translation.json';

const resources = {
    en: { translation: en },
    nl: { translation: nl },
};

export const getDeviceLanguage = (): string => {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
        const locale = locales[0]; // Get the first locale from the array
        return locale.languageCode || 'en'; // Use languageCode with a fallback to 'en'
    }
    return 'en'; // Fallback to 'en' if no locale is found
};


i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources,
        lng: getDeviceLanguage() || 'en', // Set the initial language with a fallback to 'en'
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false, // React already does escaping
        },
        compatibilityJSON: 'v3', // Adjust for latest i18next version
    })
    .catch((error) => {
        console.error('Failed to initialize i18next:', error);
    });

export default i18n;