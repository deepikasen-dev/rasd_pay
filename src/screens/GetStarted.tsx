/**
 * @file src/screens/GetStarted.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.030Z
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import otherStrings from '../utils/otherStrings';
import Routes from '../utils/Routes';
import SvgImages from '../utils/svgImages';
import colors from '../utils/colors';
import { useStatusBarColor } from '../context';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<any>;

const GetStartedScreen: React.FC<Props> = ({ navigation }) => {
  const { setColor } = useStatusBarColor();
  useFocusEffect(
    React.useCallback(() => {
      setColor(colors.bg);

      return () => {
        setColor(colors.lightBG); // Reset when unmounted
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <SvgImages.AppLogoSVG style={styles.logo} />
      <Text style={styles.title}>{otherStrings.welcomeMessage}</Text>
      <Text style={styles.subtitle}>{otherStrings.description1}</Text>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title={otherStrings.getStarted}
          onPress={() => navigation.navigate(Routes.LANGUAGE_SELECTION)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C2C3A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7A8C',
    marginBottom: 40,
  },
  buttonWrapper: {
    width: '100%',
  },
});

export default GetStartedScreen;
