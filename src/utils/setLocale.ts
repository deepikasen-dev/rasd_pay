// src/utils/setLocale.ts
import strings from './strings';
import { RootState } from '../redux/store';

export const setAppLanguage = ( languageId: string ) => {
    // Map your language ID to locale code
    const localeMap: Record<string, string> = {
        '1': 'en-US',
        '2': 'ar-SA',
    };

    const locale = localeMap[ languageId ] || 'en-US';
    strings.setLanguage( locale );
};
