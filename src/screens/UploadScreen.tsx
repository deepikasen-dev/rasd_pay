/**
 * @file src/screens/UploadScreen.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.037Z
 */

// ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';
import { hp, wp } from '../utils/globalUse';

const UploadScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.upload}>Upload Screen Not present</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload: {
    fontSize: wp(5),
    color: colors.primaryText,
  },
});

export default UploadScreen;
