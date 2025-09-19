import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensesScreen from "../screens/ExpensesScreen";
import ReceiptDetailsScreen from "../screens/ReceiptDetailsScreen";
import colors from "../utils/colors";
import SvgImages from "../utils/svgImages";
import { wp } from "../utils/globalUse";
import { TouchableOpacity } from "react-native";
import strings from "../utils/strings";

const Stack = createNativeStackNavigator();

export default function ExpensesStack() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: true } }>
            <Stack.Screen name="Expenses" component={ ExpensesScreen } options={({ navigation }) => ({
                headerShown: true, headerTitle: `${ strings.expenseHistory }`, headerShadowVisible: false, headerStyle: {
                    backgroundColor: colors.bg, // 🔹 set background color
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                    <SvgImages.BackSVG
                        style={ { marginLeft: 12 } }
                        />
                    </TouchableOpacity>
                ),
                headerTitleAlign: "center", // 🔹 centers title
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: wp(5),
                    color:colors.primaryText
                },

})}/>
            <Stack.Screen name="ReceiptDetails" component={ ReceiptDetailsScreen } options={ ( { navigation } ) => ( {
                headerShown: true, headerTitle: `${ strings.details }`, headerShadowVisible: false, headerStyle: {
                    backgroundColor: colors.bg, // 🔹 set background color
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <SvgImages.BackSVG
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
            }) } />
        </Stack.Navigator>
    );
}
