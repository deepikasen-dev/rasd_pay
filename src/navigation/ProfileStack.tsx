/**
 * @file src/navigation/ProfileStack.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.022Z
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/Profile';
import { TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { wp } from '../utils/globalUse';
import svgImages from '../utils/svgImages';
import strings from '../utils/strings';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: `${strings.profileSettings}`,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.bg, // 🔹 set background color
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <svgImages.BackSVG style={{ marginLeft: 12 }} />
            </TouchableOpacity>
          ),
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
