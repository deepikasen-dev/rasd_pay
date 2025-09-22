/**
 * @file src/navigation/ProfileStack.tsx
 * @description Navigation stack/tab configuration.
 * @lastUpdated 2025-09-19T11:33:09.022Z
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile';
import colors from '../utils/colors';
import { wp } from '../utils/globalUse';
import BackButton from '../components/BackButton';
import Routes from '../utils/Routes';
import { useStrings } from '../hooks/useStrings';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const strings = useStrings(); 
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: `${strings.profileSettings}`,
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
