/**
 * @file src/screens/Profile.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.035Z
 */

// ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout, updateUserSetting } from '../redux/slices/authSlice';
import CustomButton from '../components/CustomButton';
import SvgImages from '../utils/svgImages';
import colors from '../utils/colors';
import { hp, wp } from '../utils/globalUse';
import CustomSwitch from '../components/CustomSwitch';
import LanguageDropdown from '../components/LanguageDropDown';
import { setAppLanguage } from '../utils/setLocale';
import { setLanguage } from '../redux/slices/languageSlice';
import { useStrings } from '../hooks/useStrings';
const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const strings = useStrings(); 
  const { user } = useSelector((state: RootState) => state.auth);
  const languageId = useSelector((state: RootState) => state.language.id); // ✅ read from redux

  const [biometricEnabled, setBiometricEnabled] = useState(
    !!user?.biometric_login,
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user?.is_notify === 1,
  );

  useEffect(() => {
    if (user) {
      setBiometricEnabled(!!user.biometric_login);
      setNotificationsEnabled(user.is_notify === 1);
    }
  }, [user]);

  const handleUpdate = (field: string, value: any) => {
    dispatch(updateUserSetting({ [field]: value }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={ styles.contentContainerStyle }
      showsVerticalScrollIndicator={false}
    >
      {/* Profile */}
      <View style={styles.profileBox}>
        <TouchableOpacity>
          <Image
            source={{
              uri: user?.profile_image
                ? `https://your-api-base-url/${user.profile_image}`
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={styles.avatar}
          />
          <View style={styles.camera}>
            <SvgImages.ProfileCameraSVG />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{user?.name}</Text>
      </View>

      {/* Preferences */}
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>{strings.preferences}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>{strings.language}</Text>
          <LanguageDropdown
            selected={languageId} // ✅ redux value, not local state
            onSelect={ val => {
              handleUpdate('language_id', val);
              dispatch(setLanguage(val)); // saves to redux + AsyncStorage
              setAppLanguage(val); // updates i18n
            }}
          />
        </View>

        <View
          style={{
            borderBottomColor: colors.borderColor,
            borderBottomWidth: hp(0.1),
          }}
        />

        <View style={styles.toggleCard}>
          <Text style={styles.label}>{strings.biometricLogin}</Text>

          <CustomSwitch
            value={biometricEnabled}
            onValueChange={val => {
              setBiometricEnabled(val);
              handleUpdate('biometric_login', val ? 1 : 0);
            }}
          />
        </View>
        <View
          style={{
            borderBottomColor: colors.borderColor,
            borderBottomWidth: hp(0.1),
          }}
        />

        <View style={styles.toggleCard}>
          <Text style={styles.label}>{strings.appNotifications}</Text>

          <CustomSwitch
            value={notificationsEnabled}
            onValueChange={val => {
              setNotificationsEnabled(val);
              handleUpdate('is_notify', val ? 1 : 0);
            }}
          />
        </View>
      </View>

      {/* Security */}
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>{strings.accountSecurity}</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.label}>{strings.changePassword}</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title={strings.logout}
        onPress={() => dispatch(logout())}
        icon={<SvgImages.LogOutSVG />}
      />

      <Text style={styles.version}>{strings.appVersion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  contentContainerStyle:{ paddingBottom: 40 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 24 },
  profileBox: { alignItems: 'center', marginBottom: hp(4) },
  camera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: '#D9D9D9',
  },
  name: { fontSize: 18, fontWeight: '600' },
  sectionTitle: { color: '#666', marginBottom: 8, marginTop: 12 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 16, color: '#333' },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  version: { textAlign: 'center', color: '#999', marginTop: 16 },
  optionsContainer: {
    padding: wp(2),
    backgroundColor: colors.lightBG,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: hp(1),
  },
});

export default ProfileScreen;
