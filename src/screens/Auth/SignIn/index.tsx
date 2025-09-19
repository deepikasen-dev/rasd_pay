/**
 * @file src/screens/Auth/SignIn/index.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.028Z
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import otherStrings from '../../../utils/otherStrings';
import svgImages from '../../../utils/svgImages';
import colors from '../../../utils/colors';
import Routes from '../../../utils/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { sendVerificationCode } from '../../../redux/slices/authSlice';
import { hp, wp } from '../../../utils/globalUse';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../../utils/strings';

type Props = NativeStackScreenProps<any>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const language_id =
    useSelector((state: RootState) => state.language.id) ?? '1';

  // 🔹 Basic Validators
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val: string) => /^[0-9]{8,15}$/.test(val); // 8-15 digits

  const handleContinue = async () => {
    if (selectedTab === 'email') {
      if (!email || !validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }
      const result = await dispatch(
        sendVerificationCode({ language_id, email }),
      );
     

      if (sendVerificationCode.fulfilled.match(result)) {
  

        navigation.navigate(Routes.VERIFY_CODE, { email });
      } else if (sendVerificationCode.rejected.match(result)) {
        // ❌ failure
        Alert.alert('Error', result.payload?.message || 'Something went wrong');
      }
    } else {
      if (!phone || !validatePhone(phone)) {
        Alert.alert(
          'Invalid Phone',
          'Please enter a valid phone number (8-15 digits)',
        );
        return;
      }

      const result = await dispatch(
        sendVerificationCode({
          language_id,
          country_code: '91',
          phone_number: phone,
        } as any),
      );

      if (
        sendVerificationCode.fulfilled.match(result) &&
        result.payload?.success
      ) {
        navigation.navigate(Routes.VERIFY_CODE);
      } else {
        Alert.alert('Error', result.payload?.message || 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <svgImages.AppLogoSVG style={styles.logo} />
      <Text style={styles.title}>{strings.welcomeBack}</Text>
      <Text style={styles.subtitle}>{strings.signIn}</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {selectedTab === 'email' ? (
          <LinearGradient
            colors={[colors.primary1, colors.secondory]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tabActive}
          >
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setSelectedTab('email')}
            >
              <svgImages.EmailOnSVG />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'email' && styles.tabTextActive,
                ]}
              >
                {strings.email}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab('email')}
          >
            <svgImages.EmailOffSVG />
            <Text
              style={[
                styles.tabText,
                selectedTab === 'email' && styles.tabTextActive,
              ]}
            >
              {strings.email}
            </Text>
          </TouchableOpacity>
        )}
        {selectedTab === 'phone' ? (
          <LinearGradient
            colors={[colors.primary1, colors.secondory]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tabActive}
          >
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setSelectedTab('phone')}
            >
              <svgImages.PhoneOnSVG />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'phone' && styles.tabTextActive,
                ]}
              >
                {strings.phone}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab('phone')}
          >
            <svgImages.PhoneOffSVG />
            <Text
              style={[
                styles.tabText,
                selectedTab === 'phone' && styles.tabTextActive,
              ]}
            >
              {strings.phone}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Input */}
      {selectedTab === 'email' ? (
        <View style={styles.inputArea}>
          <Text style={styles.inputTitle}>{strings.emailAddress}</Text>
          <TextInput
            placeholder={strings.enterYourEmail}
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      ) : (
        <View style={styles.inputArea}>
          <Text style={styles.inputTitle}>{strings.phone}</Text>
          <TextInput
            placeholder={strings.enterYourEmail}
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      )}

      {/* Remember me */}
      <View style={styles.rememberRow}>
        <TouchableOpacity style={styles.checkbox} />
        <Text style={styles.inputTitle}>{strings.rememberMe}</Text>
      </View>

      <CustomButton
        title={loading ? 'Please wait...' : otherStrings.continue}
        onPress={handleContinue}
        disabled={loading}
      />

      {/* Support */}
      <TouchableOpacity style={styles.support}>
        <svgImages.CustomerSupportSVG />
        <Text style={styles.supportText}>{strings.customerSupport}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: wp(4),
    paddingTop: hp(10),
    alignItems: 'center',
  },
  logo: {
    // width: 80,
    // height: 80,
    marginBottom: hp(3),
    resizeMode: 'contain',
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    color: '#6B7A8C',
    marginBottom: hp(3),
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: hp(2),
    backgroundColor: colors.inputField,
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // height: hp( 5.2 ),
    flexDirection: 'row',
    gap: wp(3),
  },
  tabActive: {
    width: wp(40),
    borderRadius: 12,
    height: hp(5),
  },
  tabText: {
    fontSize: wp(4.5),
    color: colors.primaryText,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.lightBG,
    fontWeight: '600',
  },
  inputArea: { width: '100%', gap: hp(2) },
  input: {
    // width: "100%",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    padding: hp(2),
    marginBottom: hp(2),
    fontSize: wp(4),
    color: 'black',
    backgroundColor: colors.cardContainerBG,
  },
  inputTitle: { color: colors.primaryText, fontSize: wp(4), fontWeight: '500' },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: hp(2),
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#6B7A8C',
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: '#6B7A8C',
  },
  support: {
    width: '100%',
    marginTop: hp(2),
    paddingVertical: hp(2),
    backgroundColor: colors.btn2bg,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(3),
  },
  supportText: {
    color: '#048EC3',
    fontSize: wp(3.8),
    fontWeight: '500',
  },
});

export default SignInScreen;
