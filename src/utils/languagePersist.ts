/**
 * @file src/utils/languagePersist.ts
 * @description Utility helpers and shared logic.
 * @lastUpdated 2025-09-19T11:33:09.045Z
 */

// src/utils/languagePersist.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAppLanguage } from './setLocale';
import { AppDispatch } from '../redux/store';
import { setLanguageFromStorage } from '../redux/slices/languageSlice';

export const loadPersistedLanguage = async (dispatch: AppDispatch) => {
  const languageId = await AsyncStorage.getItem('languageId');
  if (languageId) {
    dispatch(setLanguageFromStorage(languageId));
    setAppLanguage(languageId);
  }
};
