// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import notificationsReducer from "./slices/notificationSlice";
import expensesReducer from "./slices/expenseSlice";
import walletReducer from "./slices/walletSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore( {
    reducer: {
        auth: authReducer,
        user: userReducer,
        notifications: notificationsReducer,
        expenses: expensesReducer,
        wallet: walletReducer,
        language: languageReducer,
    },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
