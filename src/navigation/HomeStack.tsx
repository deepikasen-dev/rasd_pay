import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Routes from "../utils/Routes";
import NotificationsScreen from "../screens/NotificationScreen";
import colors from "../utils/colors";
import { wp } from "../utils/globalUse";
import { TouchableOpacity } from "react-native";
import svgImages from "../utils/svgImages";

const Stack = createNativeStackNavigator();


export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name={ Routes.HOME } component={ HomeScreen } />
            <Stack.Screen name={ Routes.NOTIFICATION } component={ NotificationsScreen } options={ ( { navigation } ) => ( {
                headerShown: true, headerTitle: 'Notifications', headerShadowVisible: false, headerStyle: {
                    backgroundColor: colors.bg, // 🔹 set background color
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <svgImages.BackSVG
                            style={ { marginLeft: 12 } }
                        />
                    </TouchableOpacity>
                ),
                headerTitleAlign: "center", // 🔹 centers title
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: wp( 5 ),
                    color: colors.primaryText
                },
            } ) } />
        </Stack.Navigator>
    );
}
