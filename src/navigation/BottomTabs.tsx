import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
// import UploadScreen from "../screens/UploadScreen";
import ExpensesStack from "./ExpensesStack";
import Routes from "../utils/Routes";
import SvgImages from "../utils/svgImages";
import ProfileStack from "./ProfileStack";
import colors from "../utils/colors";
import { View } from "react-native";
import { hp, wp } from "../utils/globalUse";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={ ( { route } ) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#048EC3",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarIcon: ( { focused } ) => {

                    switch ( route.name ) {
                        case 'ExpensesTab':
                            return focused ? <SvgImages.ExpenseListOnSVG width={ 24 } height={ 24 } /> : <SvgImages.ExpenseListSVG width={24} height={24} />;
                        case 'Upload':
                            return focused ? <SvgImages.UploadCameraOnSVG width={ 24 } height={ 24 } /> : <SvgImages.UploadCameraSVG width={24} height={24} />;
                        case Routes.HOME_STACK:
                            return focused ? <SvgImages.HomeOnSVG width={ 24 } height={ 24 } /> : <SvgImages.HomeSVG width={ 24 } height={ 24 } />;
                        case 'ProfileTab':
                            return focused ? <SvgImages.UserOnSVG width={ 24 } height={ 24 } /> : <SvgImages.UserSVG width={24} height={24} />;
                    }
                },
                tabBarStyle: {
                    height: hp( 15 ),
                    borderRadius: 20,
                    backgroundColor: colors.lightBG, // 👈 must be transparent
                    borderTopWidth: 0,
                    paddingVertical:hp(10),
                },
                tabBarBackground: () => (
                    <View
                        style={ {
                            backgroundColor: colors.tabBG,
                            borderRadius: 20,
                            height: hp( 10 ),
                            position: "absolute",
                            bottom: hp( 2 ),
                            left: wp( 5),
                            right: wp( 5),
                            
                        } }
                    />
                ),
                tabBarItemStyle: {
                    borderRadius: 20,
                },
                tabBarIconStyle: {
                    marginTop: hp( 5 ), // centers vertically if needed
                },
            } )}
        >
            <Tab.Screen
                name={Routes.HOME_STACK}
                component={ HomeStack }
                options={ {
                    title: "Home",
                } }
            />
            <Tab.Screen
                name="Upload"
                component={ HomeStack }
                options={ {
                    title:'Upload'
                } }
            />
            <Tab.Screen
                name="ExpensesTab"
                component={ ExpensesStack }
                options={ {
                    title: "Expenses",
                   
                } }
            />
            <Tab.Screen
                name="ProfileTab"
                component={ ProfileStack }
                options={ {
                    title: "Profile",
                } }
            />
        </Tab.Navigator>
    );
}
