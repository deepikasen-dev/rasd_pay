// src/redux/languageSlice.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
    id: string | ""; // 1 = English, 2 = Arabic
}

const initialState: LanguageState = {
    id: "1",
};

const languageSlice = createSlice( {
    name: "language",
    initialState,
    reducers: {
        setLanguage( state, action: PayloadAction<string> ) {
            state.id = action.payload;
            AsyncStorage.setItem( "languageId", action.payload ); // persist

        },
        setLanguageFromStorage( state, action: PayloadAction<string> ) {
            state.id = action.payload;
        },
    },
} );

export const { setLanguage, setLanguageFromStorage } = languageSlice.actions;
export default languageSlice.reducer;
