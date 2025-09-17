import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name="Profile" component={ ProfileScreen } />
            <Stack.Screen name="Notifications" component={ NotificationScreen } />
        </Stack.Navigator>
    );
}
