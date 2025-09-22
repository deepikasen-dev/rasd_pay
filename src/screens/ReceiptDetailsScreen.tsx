/**
 * @file src/screens/ReceiptDetailsScreen.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.036Z
 */

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  clearSelectedExpense,
  fetchExpenseDetails,
} from '../redux/slices/expenseSlice';
import colors from '../utils/colors';
import CustomButton from '../components/CustomButton';
import svgImages from '../utils/svgImages';
import { hp } from '../utils/globalUse';
import { getLocalizedStatus } from '../utils/getLocalizedStatus';
import { useStrings } from '../hooks/useStrings';

type RootStackParamList = {
  ReceiptDetails: { id: number };
};

type ReceiptDetailsRouteProp = RouteProp<RootStackParamList, 'ReceiptDetails'>;

const ReceiptDetailsScreen: React.FC = () => {
  const route = useRoute<ReceiptDetailsRouteProp>();
  const { id } = route.params;
    const strings = useStrings(); 

  const dispatch = useDispatch<AppDispatch>();
  const { selectedExpense, loading, error } = useSelector(
    (state: RootState) => state.expenses,
  );

  useEffect(() => {
    dispatch(fetchExpenseDetails(id));
    return () => {
      dispatch(clearSelectedExpense()); // 🔹 clear when unmounts
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary1} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!selectedExpense) {
    return (
      <View style={styles.center}>
        <Text>{strings.noDetails}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>{strings.submittedDate}</Text>
        <View style={styles.row}>
          <Text style={styles.text}>{selectedExpense.invoice_date}</Text>
          <Text
            style={[
              styles.status,
              selectedExpense.status === 'pending'
                ? styles.pending
                : selectedExpense.status === 'approved'
                ? styles.approved
                : styles.rejected,
            ]}
          >
            {getLocalizedStatus(selectedExpense.status)}
          </Text>
        </View>

        <Text style={styles.label}>{strings.vendor}</Text>
        <Text style={styles.text}>{selectedExpense.vendor_name}</Text>

        <Text style={styles.label}>{strings.amount}</Text>
        <Text style={styles.amount}>${selectedExpense.total_amount}</Text>
      </View>

      <View style={styles.receiptBox}>
        {selectedExpense.invoice_url ? (
          <Image
            source={{ uri: selectedExpense.invoice_url }}
            style={styles.receiptImage}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.placeholder}>{strings.noReceipt}</Text>
        )}
      </View>

      <View style={styles.button}>
        <CustomButton
          title={strings.downloadReceipt}
          onPress={() => console.log('')}
          icon={<svgImages.DownloadSVG />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  card: {color:colors.lightBG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  label: { color: '#666', marginTop: 8 },
  text: { fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  status: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pending: { backgroundColor: colors.pendingBG, color:colors.pendingText },
  approved: { backgroundColor: colors.approvedBG, color:colors.approvedText },
  rejected: { backgroundColor: colors.rejectedBG, color:colors.errorText },
  amount: { fontSize: 18, fontWeight: '700', color: colors.primaryText },
  receiptBox: {
    backgroundColor: colors.lightBG,
    height: hp(30),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  receiptImage: {
    width: '90%',
    height: '90%',
    borderRadius: 16,
    backgroundColor: colors.lightBG,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  placeholder: { color: '#999' },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color:colors.lightBG, fontWeight: '600', fontSize: 16 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
});

export default ReceiptDetailsScreen;
