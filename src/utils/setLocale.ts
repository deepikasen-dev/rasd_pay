/**
 * @file src/utils/setLocale.ts
 * @description Utility helpers and shared logic.
 * @lastUpdated 2025-09-19T11:33:09.055Z
 */

// src/utils/setLocale.ts
import strings from './strings';
import { RootState } from '../redux/store';

export const setAppLanguage = (languageId: string) => {
  // Map your language ID to locale code
  const localeMap: Record<string, string> = {
    '1': 'en-US',
    '2': 'ar-SA',
  };

  const locale = localeMap[languageId] || 'en-US';
  strings.setLanguage(locale);
};
