import React from 'react';
import Routes from '../utils/Routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';


export type RootStackParamList = {
    [ Routes.SPALSH ]: undefined;
    [ Routes.ONBOARDING ]: undefined;
    [ Routes.SIGN_IN ]: undefined;
    [ Routes.GET_STARTED ]: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            { StackScreen( Routes.SPALSH, SplashScreen ) }
            { StackScreen( Routes.ONBOARDING, OnboardingScreen ) }
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