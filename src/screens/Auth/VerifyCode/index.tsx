/**
 * @file src/screens/Auth/VerifyCode/index.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.029Z
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import OTPInput from '../../../components/OTPInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import otherStrings from '../../../utils/otherStrings';
import SvgImages from '../../../utils/svgImages';
import Routes from '../../../utils/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { verifyCode } from '../../../redux/slices/authSlice';
import { hp, wp } from '../../../utils/globalUse';
import colors from '../../../utils/colors';
import strings from '../../../utils/strings';

type Props = NativeStackScreenProps<any>;

const VerifyCodeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [code, setCode] = useState(Array(4).fill('')); // 4-digit OTP
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  // email comes from SignInScreen navigation
  const email = route.params?.email;

  // Countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleContinue = async () => {
    const enteredCode = code.join('');

    if (enteredCode.length < 4) {
      setError(true);
      return;
    }

    const result = await dispatch(verifyCode({ email, otp_code: enteredCode }));

    if (verifyCode.fulfilled.match(result)) {


      setError(false);

      navigation.reset({
        index: 0,
        routes: [{ name: Routes.BOTTOM_STACK }],
      });
    } else {
      setError(true);
      Alert.alert('Error', 'Invalid code, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <SvgImages.BackSVG />
      </TouchableOpacity>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <SvgImages.VerifyCodeSVG />
      </View>

      <Text style={styles.title}>{strings.enterVerificationCode}</Text>
      <Text style={styles.subtitle}>
        {strings.sentCodeMessage} {email}
      </Text>

      {/* OTPInput component */}
      <OTPInput length={4} code={code} setCode={setCode} error={error} />

      {/* Error */}
      {error && <Text style={styles.errorText}>{strings.invalidCode}</Text>}

      {/* Resend */}
      <TouchableOpacity
        onPress={() => {
          if (timer === 0) {
            setTimer(60);
            setCode(['', '', '', '']);
            setError(false);
          }
        }}
        disabled={timer > 0}
      >
        <Text style={styles.resendText}>
          {timer > 0
            ? `${strings.resendIn} ${timer} ${strings.seconds}`
            : `${strings.ResendCode}`}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title={strings.continue}
          onPress={handleContinue}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: wp(5),
    paddingTop: hp(10),
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: hp(10),
    left: wp(5),
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  title: {
    fontSize: wp(6),
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: wp(4),
    color: '#6B7A8C',
    marginBottom: hp(3),
    textAlign: 'center',
  },
  errorText: {
    color: colors.errorText,
    fontSize: wp(4),
    marginBottom: hp(3),
  },
  resendText: {
    color: colors.primaryText,
    marginBottom: hp(4),
    fontSize: wp(4),
  },
  buttonWrapper: {
    width: '100%',
  },
});

export default VerifyCodeScreen;
