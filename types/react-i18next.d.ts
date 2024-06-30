import 'react-i18next';

import en from 'assets/locales/english/translation.json';
import nl from 'assets/locales/dutch/translation.json';
import { Restart } from 'fiction-expo-restart'

declare module 'react-i18next' {
    interface Resources {
        translation: typeof en & typeof nl;
    }
}
