import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensesScreen from "../screens/ExpensesScreen";
import ReceiptDetailsScreen from "../screens/ReceiptDetailsScreen";
import colors from "../utils/colors";
import SvgImages from "../utils/svgImages";
import { wp } from "../utils/globalUse";

const Stack = createNativeStackNavigator();

export default function ExpensesStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: true } }>
            <Stack.Screen name="Expenses" component={ ExpensesScreen } options={ {
                headerShown: true, headerTitle: 'Expense History', headerShadowVisible: false, headerStyle: {
                    backgroundColor: colors.bg, // 🔹 set background color
                },
                headerLeft: () => (
                    <SvgImages.BackSVG
                        width={ 28 }
                        height={ 28 }
                        style={ { marginLeft: 12 } }
                    />
                ),
                headerTitleAlign: "center", // 🔹 centers title
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: wp(5),
                    color:colors.primaryText
                },
}}/>
            <Stack.Screen name="ReceiptDetails" component={ ReceiptDetailsScreen } options={ {
                headerShown: true, headerTitle: 'Details', headerShadowVisible: false, headerStyle: {
                    backgroundColor: colors.bg, // 🔹 set background color
                },
                headerLeft: () => (
                    <SvgImages.BackSVG
                        width={ 28 }
                        height={ 28 }
                        style={ { marginLeft: 12 } }
                    />
                ),
                headerTitleAlign: "center", // 🔹 centers title
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: wp( 5 ),
                    color: colors.primaryText
                },
            } } />
        </Stack.Navigator>
    );
}
