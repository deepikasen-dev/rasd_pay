/**
 * @file src/components/ExpenseCard.tsx
 * @description Reusable card component for displaying expense details.
 * @lastUpdated 2025-09-22T10:15:00.000Z
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Expense } from '../types/expense';
import { wp } from '../utils/globalUse';
import colors from '../utils/colors';
import SvgImages from '../utils/svgImages';
import { getLocalizedStatus } from '../utils/getLocalizedStatus';
import Routes from '../utils/Routes';
import { useStrings } from '../hooks/useStrings';

interface ExpenseCardProps {
    item: Expense;
    navigation: any;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ( { item, navigation } ) => {
      const strings = useStrings(); 
    return (
        <TouchableOpacity
            style={ styles.card }
            onPress={ () => navigation.navigate( Routes.RECEIPT_DETAILS, { id: item.id } ) }
        >
            {/* Vendor Name + Status */ }
            <View style={ styles.headerRow }>
                <Text style={ styles.title }>{ item.vendor_name }</Text>
                <View
                    style={ [
                        styles.statusBadge,
                        item.status === 'approved'
                            ? styles.approved
                            : item.status === 'pending'
                                ? styles.pending
                                : styles.rejected,
                    ] }
                >
                    <Text
                        style={ [
                            styles.statusText,
                            item.status === 'approved'
                                ? styles.approvedText
                                : item.status === 'pending'
                                    ? styles.pendingText
                                    : styles.rejectedText,
                        ] }
                    >
                        { getLocalizedStatus( item.status ) }
                    </Text>
                </View>
            </View>

            {/* Amount */ }
            <Text style={ styles.amount }>${ parseFloat( item.total_amount ).toFixed( 2 ) }</Text>

            {/* Footer: View Receipt + Date */ }
            <View style={ styles.footerRow }>
                <TouchableOpacity
                    onPress={ () => navigation.navigate( Routes.RECEIPT_DETAILS, { receipt: item } ) }
                >
                    <View style={ { flexDirection: 'row', gap: wp( 2 ) } }>
                        <SvgImages.EyeOnSVG />
                        <Text style={ styles.viewReceipt }>{ strings.viewReceipt }</Text>
                    </View>
                </TouchableOpacity>
                <Text style={ styles.date }>{ item.invoice_date }</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
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
    title: { fontWeight: '400', fontSize: 16, color: colors.secondoryText },
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
} );

export default ExpenseCard;
