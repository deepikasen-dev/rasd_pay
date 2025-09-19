/**
 * @file src/components/ActionCard.tsx
 * @description Reusable UI component for the app.
 * @lastUpdated 2025-09-19T11:33:09.009Z
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { hp, wp } from '../utils/globalUse';
import colors from '../utils/colors';

type Props = {
  icon: React.ReactNode; // Pass in your Svg component
  label: string;
  amount: string | number;
  backgroundColor?: string;
  amountColor?: string;
  onPress?: () => void;
};

const ActionCard: React.FC<Props> = ({
  icon,
  label,
  amount,
  backgroundColor = colors.cardBg,
  amountColor = colors.primaryText,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, { color: amountColor }]}>${amount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    marginVertical: hp(4),
  },
  iconWrapper: {
    marginBottom: hp(1),
  },
  label: {
    fontSize: wp(3),
    fontWeight: '600',
    color: '#334155',
  },
  amount: {
    fontSize: wp(4.5),
    fontWeight: '700',
    marginTop: hp(1),
  },
});

export default ActionCard;
