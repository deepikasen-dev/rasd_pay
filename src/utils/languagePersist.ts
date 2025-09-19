// src/utils/languagePersist.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAppLanguage } from "./setLocale";
import { AppDispatch } from "../redux/store";
import { setLanguageFromStorage } from "../redux/slices/languageSlice";

export const loadPersistedLanguage = async ( dispatch: AppDispatch ) => {
    const languageId = await AsyncStorage.getItem( "languageId" );
    if ( languageId ) {
        dispatch( setLanguageFromStorage( languageId ) );
        setAppLanguage( languageId );
    }
};
