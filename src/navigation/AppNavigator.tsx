import React from 'react';
import Routes from '../utils/Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import GetStartedScreen from '../screens/GetStarted';
import LanguageSelectionScreen from '../screens/LanguageSelection';
import SignInScreen from '../screens/Auth/SignIn';
import VerifyCodeScreen from '../screens/Auth/VerifyCode';
import BottomTabs from './BottomTabs';
// import HomeScreen from '../screens/HomeScreen';


export type RootStackParamList = {
    [ Routes.SPALSH ]: undefined;
    [ Routes.ONBOARDING ]: undefined;
    [ Routes.SIGN_IN ]: undefined;
    [ Routes.GET_STARTED ]: undefined;
    [ Routes.LANGUAGE_SELECTION ]: undefined;
    [ Routes.BOTTOM_STACK ]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            { StackScreen( Routes.SPALSH, SplashScreen ) }
            { StackScreen( Routes.ONBOARDING, OnboardingScreen ) }
            { StackScreen( Routes.GET_STARTED, GetStartedScreen ) }
            { StackScreen( Routes.LANGUAGE_SELECTION, LanguageSelectionScreen ) }
            { StackScreen( Routes.SIGN_IN, SignInScreen ) }
            { StackScreen( Routes.VERIFY_CODE, VerifyCodeScreen ) }
            { StackScreen( Routes.BOTTOM_STACK, BottomTabs ) }
            
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;

export const StackScreen = (
    name: string,
    component: any,
    options: any = {},
) => {
    return (
        <Stack.Screen
            options={ {
                headerShown: false,
                ...options,
            } }
            name={ name }
            component={ component }
        />
    );
};