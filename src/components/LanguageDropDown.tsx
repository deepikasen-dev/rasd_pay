/**
 * @file src/components/LanguageDropDown.tsx
 * @description Reusable UI component for the app.
 * @lastUpdated 2025-09-19T11:33:09.011Z
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import SvgImages from '../utils/svgImages';
import colors from '../utils/colors';
import { hp, wp } from '../utils/globalUse';

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

const LanguageDropdown: React.FC<Props> = ({ selected, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selected === '1' ? 'English' : 'Arabic'}
        </Text>
        <SvgImages.ChevronDownSVG />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {[
              { label: 'English', value: '1' },
              { label: 'Arabic', value: '2' },
            ].map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => {
                  onSelect(item.value);
                  setVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    gap: wp(2),
  },
  dropdownText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    paddingVertical: 8,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: colors.primaryText,
  },
});

export default LanguageDropdown;
