/**
 * @file src/navigation/AppNavigator.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.018Z
 */

import React, { useEffect } from 'react';
import Routes from '../utils/Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import GetStartedScreen from '../screens/GetStarted';
import LanguageSelectionScreen from '../screens/LanguageSelection';
import SignInScreen from '../screens/Auth/SignIn';
import VerifyCodeScreen from '../screens/Auth/VerifyCode';
import BottomTabs from './BottomTabs';
import { loadToken, fetchUserDetails } from '../redux/slices/authSlice';
// import { ActivityIndicator, View } from "react-native";

export type RootStackParamList = {
  [Routes.SPALSH]: undefined;
  [Routes.ONBOARDING]: undefined;
  [Routes.SIGN_IN]: undefined;
  [Routes.GET_STARTED]: undefined;
  [Routes.LANGUAGE_SELECTION]: undefined;
  [Routes.VERIFY_CODE]: { email: string };
  [Routes.BOTTOM_STACK]: undefined;
  [Routes.UPLOAD]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigator deciding between Auth flow and Main app flow.
 * It restores token on mount and fetches user details when present.
 */
const AppNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useSelector((state: RootState) => state.auth);

  // On mount: restore token from storage and then fetch profile
  useEffect(() => {
    dispatch(loadToken()).then((res: any) => {
      if (res.payload) {
        dispatch(fetchUserDetails());
      }
    });
  }, [dispatch]);

  // if ( restoring ) {
  //     return (
  //         <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
  //             <ActivityIndicator size="large" color="#048EC3" />
  //         </View>
  //     );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token || !user ? (
          // 🔹 AUTH FLOW
          <>
            {StackScreen(Routes.SPALSH, SplashScreen)}
            {StackScreen(Routes.ONBOARDING, OnboardingScreen)}
            {StackScreen(Routes.GET_STARTED, GetStartedScreen)}
            {StackScreen(Routes.LANGUAGE_SELECTION, LanguageSelectionScreen)}
            {StackScreen(Routes.SIGN_IN, SignInScreen)}
            {StackScreen(Routes.VERIFY_CODE, VerifyCodeScreen)}
          </>
        ) : (
          // 🔹 MAIN APP FLOW
          <>{StackScreen(Routes.BOTTOM_STACK, BottomTabs)}</>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

export const StackScreen = (
  name: string,
  component: any,
  options: any = {},
) => {
  return (
    <Stack.Screen
      options={{
        headerShown: false,
        ...options,
      }}
      name={name}
      component={component}
    />
  );
};
