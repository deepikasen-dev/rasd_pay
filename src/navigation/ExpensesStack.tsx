/**
 * @file src/navigation/ExpensesStack.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.020Z
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesScreen from '../screens/ExpensesScreen';
import ReceiptDetailsScreen from '../screens/ReceiptDetailsScreen';
import colors from '../utils/colors';
import { wp } from '../utils/globalUse';
import strings from '../utils/strings';
import BackButton from '../components/BackButton';
import Routes from '../utils/Routes';

const Stack = createNativeStackNavigator();

export default function ExpensesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name={Routes.EXPENSES}
        component={ExpensesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: `${strings.expenseHistory}`,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.bg, // 🔹 set background color
          },
        headerLeft: () => <BackButton onPress={ () => navigation.goBack() } />,

          headerTitleAlign: 'center', // 🔹 centers title
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: wp(5),
            color: colors.primaryText,
          },
        })}
      />
      <Stack.Screen
        name={Routes.RECEIPT_DETAILS}
        component={ReceiptDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: `${strings.details}`,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.bg, // 🔹 set background color
          },
          headerLeft: () => <BackButton onPress={ () => navigation.goBack() } />,

          headerTitleAlign: 'center', // 🔹 centers title
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: wp(5),
            color: colors.primaryText,
          },
        })}
      />
    </Stack.Navigator>
  );
}
