/**
 * @file src/screens/HomeScreen.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.032Z
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';
import { useStatusBarColor } from '../context';
import { useFocusEffect } from '@react-navigation/native';
import globalUse, { hp, wp } from '../utils/globalUse';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import SvgImages from '../utils/svgImages';
import NotificationBell from '../components/NotificationBell';
import { fetchUserDetails } from '../redux/slices/authSlice';
import WalletCard from '../components/WalletCard';
import ActionCard from '../components/ActionCard';
import WalletModal from '../components/WalletModal';
import { useStrings } from '../hooks/useStrings';

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { setColor } = useStatusBarColor();
  const dispatch = useDispatch<AppDispatch>();
  const strings = useStrings(); 
  // ✅ Get user & funds from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const funds = useSelector((state: RootState) => state.auth.funds);

  useFocusEffect(
    React.useCallback(() => {
      setColor(colors.secondory);
      // ✅ Fetch fresh user details when screen is focused
      dispatch(fetchUserDetails());
    }, [dispatch]),
  );

    // useFocusEffect(
    //   React.useCallback( () => {
    //     // Set the status bar for this screen
    //     // StatusBar.setBarStyle( 'light-content' ); // for iOS
    //     StatusBar.setBackgroundColor( colors.secondory ); // for Android
    //   }, [] )
    // );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section with Gradient */}

      <LinearGradient
        colors={[colors.primary1, colors.secondory]}
        style={styles.headerBackground}
      >
        {/* <SvgImages.HomeHeaderSVG/> */}
        {/* Top Row: Profile + Notifications */}
        <ImageBackground
          source={require('../assets/pngs/HomeHeaderIMG.png')}
          style={{ width: globalUse.WIDTH }}
          resizeMode="cover"
        >
          <View style={styles.topRow}>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri: user?.profile_image
                    ? `https://your-api.com/${user.profile_image}`
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // fallback avatar
                }}
                style={styles.avatar}
              />
              {/* <Image source={ { uri: "invoices/user_11/profile_68ca628951577_2025-09-17.jpg" } } style={ styles.avatar } /> */}
              <View>
                <Text style={styles.welcome}>{strings.welcomeBack}</Text>
                <Text style={styles.username}>{user?.name || strings.guest}</Text>
              </View>
            </View>

            <NotificationBell count={user?.notification_count} />
          </View>
        </ImageBackground>
      </LinearGradient>

      {/* Wallet Card */}
      {!modalVisible && (
        <WalletCard
          balance={funds?.remaining_balance || '0.00'}
          userName={user?.name || strings.guest}
          onPress={() => setModalVisible(true)}
        />
      )}

      {/* Bottom Section */}
      {!modalVisible && (
        <View style={styles.bottomSection}>
          <View style={styles.row}>
            <ActionCard
              icon={<SvgImages.FundReceivedSVG />}
              label={strings.fundReceived}
              amount={funds?.funds_received || '0.00'}
              onPress={() => setModalVisible(true)}
            />
            <ActionCard
              icon={<SvgImages.FundSpentSVG />}
              label={strings.fundSpent}
              amount={funds?.funds_spent || '0.00'}
              backgroundColor={colors.card2Bg}
              amountColor={colors.color2}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      )}

      {/* Wallet Modal */}

       {/* Inside return */}
      <WalletModal
        visible={ modalVisible }
        onClose={ () => setModalVisible( false ) }
        funds={ funds }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerBackground: {
    paddingBottom: hp(10),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: hp(30),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 20,
    alignItems: 'center',
    marginTop: hp(5),
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: colors.primaryText,
  },
  welcome: { color: colors.primaryText, fontSize: wp(3) },
  username: { color: colors.cardDark, fontSize: wp(4), fontWeight: '600' },
  notificationWrapper: { position: 'relative' },
  notificationIcon: { width: 28, height: 28, tintColor: '#fff' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.badgeColor,
    borderRadius: 3.2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  bottomSection: { paddingHorizontal: wp(2), gap: wp(2), marginTop: hp(2) },
  row: { flexDirection: 'row', justifyContent: 'space-between' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: hp(60),
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  summaryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "center",
  },
  summaryLabel: { fontSize: 14, color: '#475569', marginVertical: hp(0.5) },
  summaryAmount: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#000000',
    marginVertical: hp(0.5),
  },
  summaryRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },

  closeButton: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: { color: colors.primaryText, fontWeight: '600' },
});

export default HomeScreen;
