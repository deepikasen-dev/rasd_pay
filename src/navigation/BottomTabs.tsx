/**
 * @file src/navigation/BottomTabs.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.018Z
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import HomeStack from "./HomeStack";
import ExpensesStack from "./ExpensesStack";
import ProfileStack from "./ProfileStack";
import UploadScreen from "../screens/UploadScreen";
import Routes from "../utils/Routes";
import SvgImages from "../utils/svgImages";
import colors from "../utils/colors";
import { hp, wp } from "../utils/globalUse";
import strings from "../utils/strings";

const Tab = createBottomTabNavigator();

// 🔹 Extracted helper to avoid inline switch
const getTabBarIcon = ( routeName: string, focused: boolean ) => {
    switch ( routeName ) {
        case Routes.EXPENSES_TAB:
            return focused ? <SvgImages.ExpenseListOnSVG  /> : <SvgImages.ExpenseListSVG />;
        case Routes.UPLOAD:
            return focused ? <SvgImages.UploadCameraOnSVG /> : <SvgImages.UploadCameraSVG />;
        case Routes.HOME_STACK:
            return focused ? <SvgImages.HomeOnSVG /> : <SvgImages.HomeSVG />;
        case Routes.PROFILE_TAB:
            return focused ? <SvgImages.UserOnSVG /> : <SvgImages.UserSVG />;
        default:
            return null;
    }
};

// 🔹 Extracted styles/config for tab bar
const tabBarStyle = {
    height: hp( 15 ),
    borderRadius: 20,
    backgroundColor: colors.lightBG,
    borderTopWidth: 0,
    paddingVertical: hp( 10 ),
};

const tabBarBackground = () => (
    <View
        style={ styles.tabBar}
    />
);

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={ ( { route } ) => ( {
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#048EC3",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarIcon: ( { focused } ) => getTabBarIcon( route.name, focused ),
                tabBarStyle,
                tabBarBackground,
                tabBarItemStyle: { borderRadius: 20 },
                tabBarIconStyle: { marginTop: hp( 5 ) },
            } ) }
        >
            <Tab.Screen
                name={ Routes.HOME_STACK }
                component={ HomeStack }
                options={ { title: strings.home } }
            />
            <Tab.Screen
                name={Routes.UPLOAD}
                component={ UploadScreen }
                options={ { title: strings.upload } }
            />
            <Tab.Screen
                name={Routes.EXPENSES_TAB}
                component={ ExpensesStack }
                options={ { title: strings.expenses } }
            />
            <Tab.Screen
                name={Routes.PROFILE_TAB}
                component={ ProfileStack }
                options={ { title: strings.profile } }
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create( {
     tabBar:{
        backgroundColor: colors.tabBG,
        borderRadius: 20,
        height: hp( 10 ),
        position: "absolute",
        bottom: hp( 2 ),
        left: wp( 5 ),
        right: wp( 5 ),
    }
})