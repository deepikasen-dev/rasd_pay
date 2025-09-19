/**
 * @file src/components/CustomSwitch.tsx
 * @description Reusable UI component for the app.
 * @lastUpdated 2025-09-19T11:33:09.010Z
 */

// components/CustomSwitch.tsx
import React, { useState } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { wp } from '../utils/globalUse';
import SvgImages from '../utils/svgImages';
import colors from '../utils/colors';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
}) => {
  const [animValue] = useState(new Animated.Value(value ? 1 : 0));

  const toggle = () => {
    const newVal = !value;
    Animated.timing(animValue, {
      toValue: newVal ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onValueChange(newVal);
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, wp(8) - wp(7) - 2], // trackWidth - knobWidth - padding
  });

  return (
    <Pressable onPress={toggle} style={styles.track}>
      <Animated.View style={[styles.knob, { transform: [{ translateX }] }]}>
        {value ? <SvgImages.ButtonOnSVG /> : <SvgImages.ButtonOffSVG />}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: wp(8),
    height: wp(4),
    borderRadius: wp(4),
    justifyContent: 'center',
    padding: 2,
  },
  knob: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: '#fff', // can remove if SVG has bg
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomSwitch;
