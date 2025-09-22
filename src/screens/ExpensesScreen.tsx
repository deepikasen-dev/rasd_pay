/**
 * @file src/screens/ExpensesScreen.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.030Z
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../redux/slices/expenseSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Expense } from '../types/expense';
import colors from '../utils/colors';
import ExpenseCard from '../components/ExpenseCard';
import { useStrings } from '../hooks/useStrings';

const ExpensesScreen: React.FC<any> = ( { navigation } ) => {
  const strings = useStrings(); 
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]['key']>('all');


 const TABS = [
    { key: 'all', label: strings.all },
    { key: 'pending', label: strings.pending },
    { key: 'approved', label: strings.approved },
    { key: 'rejected', label: strings.rejected },
  ];


  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses({ page: 1, limit: 20 }));
  }, [dispatch]);

  const filteredReceipts =
    activeTab === TABS[0].key
      ? list
      : list.filter((r: Expense) => r.status === activeTab);

  
  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key as typeof activeTab)}
          >
            <Text
              style={activeTab === tab.key ? styles.activeText : styles.tabText}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Receipt List */}
      {loading ? (
        <Text>{strings.loading}</Text>
      ) : (
        <FlatList
          data={filteredReceipts}
          keyExtractor={item => item.id.toString()}
            renderItem={ ( { item } ) => (
              <ExpenseCard item={ item } navigation={ navigation } />
            ) }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create( {
  container: { flex: 1, padding: 16, backgroundColor: colors.bg },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#fff', borderRadius: 6 },
  tabText: { color: '#9CA3AF', textTransform: 'capitalize' },
  activeText: { color: colors.primaryText, fontWeight: '600' },

  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#E0E0E0',
      borderWidth: 1,
   
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontWeight: '400', fontSize: 16, color:colors.secondoryText },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  approved: { backgroundColor: colors.approvedBG },
  pending: { backgroundColor: colors.pendingBG },
  rejected: { backgroundColor: colors.rejectedBG },
  approvedText: { color: colors.approvedText },
  pendingText: { color: colors.pendingText },
  rejectedText: { color: colors.errorText },
  statusText: { fontSize: 12, fontWeight: '400', textTransform: 'capitalize' },

  amount: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewReceipt: { color: '#048EC3', fontWeight: '500' },
  date: { color: '#6B7280', fontSize: 12 },
});

export default ExpensesScreen;