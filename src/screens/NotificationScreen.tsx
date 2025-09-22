/**
 * @file src/screens/NotificationScreen.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.033Z
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNotification,
  getNotifications,
} from '../redux/slices/notificationSlice';
import { RootState, AppDispatch } from '../redux/store';
import colors from '../utils/colors';
import { hp } from '../utils/globalUse';
import NotificationCard from '../components/NotificationCard';
import { useStrings } from '../hooks/useStrings';

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    const strings = useStrings(); 
  const { list, loading } = useSelector(
    (state: RootState) => state.notifications,
  );

  useEffect(() => {
    dispatch(getNotifications({ page: 1, limit: 20 }));
  }, [dispatch]);



  const handleDelete = ( id:  number ) => {
    dispatch( deleteNotification( id ) );
  };

  return (
    <View style={ styles.container }>
      { loading ? (
        <Text>{strings.loading}</Text>
      ) : (
        <FlatList
          data={ list }
          keyExtractor={ item => item.id.toString() }
          renderItem={ ( { item } ) => (
            <NotificationCard item={ item } onDelete={ handleDelete } />
          ) }
          contentContainerStyle={ styles.contentContainerStyle}
        />
      ) }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1E3A8A',
  },

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
  contentContainerStyle: { paddingBottom: 16 }
});

export default NotificationsScreen;
