import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name="Profile" component={ ProfileScreen } />
            <Stack.Screen name="Notifications" component={ NotificationScreen } />
        </Stack.Navigator>
    );
}
