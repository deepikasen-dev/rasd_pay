/**
 * @file src/components/NotificationCard.tsx
 * @description Reusable card component for displaying a single notification.
 * @lastUpdated 2025-09-22T12:05:00.000Z
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import colors from '../utils/colors';
import { hp } from '../utils/globalUse';
import svgImages from '../utils/svgImages';
import strings from '../utils/strings';

interface NotificationCardProps {
  item: any;
  onDelete: (id: number) => void;
}

const SVG_ICONS: any = {
  expense_approved: svgImages.ExpenseApprovedSVG,
  expense_rejected: svgImages.ExpenseRejectedSVG,
  price_alert: svgImages.PriceAlertSVG,
  budget_warning: svgImages.BudgetWarningSVG,
  default: svgImages.ExpenseApprovedSVG,
};

const NotificationCard: React.FC<NotificationCardProps> = ({ item, onDelete }) => {
  const Icon = SVG_ICONS[item.type] || SVG_ICONS.default;

  const handleDelete = () => {
    Alert.alert(
      strings.deleteNotification,
      strings.deleteNotificationConfirm,
      [
        { text:strings.cancel, style: 'cancel' },
        {
          text: strings.cancel,
          style: 'destructive',
          onPress: () => onDelete(item.id),
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      {/* Left Icon */}
      <View style={styles.iconWrapper}>
        <Icon />
      </View>

      {/* Middle Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.payload?.title || formatTitle(item.type)}
        </Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.payload?.body}
        </Text>
      </View>

      {/* Right: Time + Delete */}
      <View style={styles.rightSection}>
        <Text style={styles.date}>{moment(item.created_at).fromNow()}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <svgImages.DustBinSVG width={18} height={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTitle = (type: string) => {
  switch (type) {
    case 'expense_approved':
      return `${strings.expenseApproved}`;
    case 'expense_rejected':
          return `${ strings.expenseRejected }`;
    case 'price_alert':
          return `${ strings.priceAlert }`;
    case 'budget_warning':
          return `${ strings.budgetWarning }`;
    default:
          return `${ strings.expenseApproved }`;
  }
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: hp(1),
    marginBottom: hp(2),
    borderColor: colors.borderColor,
    paddingVertical: hp(2),
    borderWidth: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: { flex: 1 },
  title: { fontWeight: '600', fontSize: 15, color: '#111827' },
  message: { color: '#6B7280', fontSize: 13, marginTop: 2 },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  date: { fontSize: 11, color: 'black', marginBottom: 6 },
});

export default NotificationCard;
