/**
 * @file src/redux/store.ts
 * @description Redux state management logic (slice/store/selectors).
 * @lastUpdated 2025-09-19T11:33:09.028Z
 */

// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notificationsReducer from './slices/notificationSlice';
import expensesReducer from './slices/expenseSlice';
import walletReducer from './slices/walletSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    expenses: expensesReducer,
    wallet: walletReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
