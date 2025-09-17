import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Routes from "../utils/Routes";
import NotificationsScreen from "../screens/NotificationScreen";

const Stack = createNativeStackNavigator();


export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name={ Routes.HOME } component={ HomeScreen } />
            <Stack.Screen name={ Routes.NOTIFICATION } component={ NotificationsScreen } />
        </Stack.Navigator>
    );
}
