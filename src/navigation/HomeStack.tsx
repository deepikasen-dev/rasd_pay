/**
 * @file src/navigation/HomeStack.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.022Z
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Routes from '../utils/Routes';
import NotificationsScreen from '../screens/NotificationScreen';
import colors from '../utils/colors';
import { wp } from '../utils/globalUse';
import strings from '../utils/strings';
import BackButton from '../components/BackButton';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      <Stack.Screen
        name={Routes.NOTIFICATION}
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: `${strings.notifications}`,
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
