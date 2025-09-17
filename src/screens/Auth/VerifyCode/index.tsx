import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../../components/CustomButton";
import OTPInput from "../../../components/OTPInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../../../utils/otherStrings";
import SvgImages from "../../../utils/svgImages";
import Routes from "../../../utils/Routes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { verifyCode } from "../../../redux/slices/authSlice";

type Props = NativeStackScreenProps<any>;

const VerifyCodeScreen: React.FC<Props> = ( { navigation, route } ) => {
    const [ code, setCode ] = useState( Array( 4 ).fill( "" ) ); // 4-digit OTP
    const [ error, setError ] = useState( false );
    const [ timer, setTimer ] = useState( 60 );
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector( ( state: RootState ) => state.auth );

    // email comes from SignInScreen navigation
    const email = route.params?.email;

    // Countdown
    useEffect( () => {
        if ( timer > 0 ) {
            const interval = setInterval( () => setTimer( ( t ) => t - 1 ), 1000 );
            return () => clearInterval( interval );
        }
    }, [ timer ] );

    const handleContinue = async () => {
        const enteredCode = code.join( "" );

        if ( enteredCode.length < 4 ) {
            setError( true );
            return;
        }

        const result = await dispatch(
            verifyCode( { email, otp_code: enteredCode } )
        );

        if ( verifyCode.fulfilled.match( result ) ) {
            setError( false );
            console.log( "✅ Code verified, user:", result.payload.data.user );
            navigation.reset( {
                index: 0,
                routes: [ { name: Routes.BOTTOM_STACK } ],
            } );
        } else {
            setError( true );
            Alert.alert( "Error", "Invalid code, please try again." );
        }
    };

    return (
        <View style={ styles.container }>
            {/* Back button */ }
            <TouchableOpacity
                style={ styles.backBtn }
                onPress={ () => navigation.goBack() }
            >
                <SvgImages.BackSVG />
            </TouchableOpacity>

            {/* Icon */ }
            <View style={ styles.iconWrapper }>
                <SvgImages.VerifyCodeSVG />
            </View>

            <Text style={ styles.title }>Enter Verification Code</Text>
            <Text style={ styles.subtitle }>
                We’ve sent a 4 digit code to your email { email }
            </Text>

            {/* OTPInput component */ }
            <OTPInput length={ 4 } code={ code } setCode={ setCode } error={ error } />

            {/* Error */ }
            { error && <Text style={ styles.errorText }>Invalid code, try again</Text> }

            {/* Resend */ }
            <TouchableOpacity
                onPress={ () => {
                    if ( timer === 0 ) {
                        setTimer( 60 );
                        setCode( [ "", "", "", "" ] );
                        setError( false );
                    }
                } }
                disabled={ timer > 0 }
            >
                <Text style={ styles.resendText }>
                    { timer > 0 ? `Resend in ${ timer } seconds` : "Resend Code" }
                </Text>
            </TouchableOpacity>

            <View style={ styles.buttonWrapper }>
                <CustomButton
                    title={ loading ? "Verifying..." : otherStrings.continue }
                    onPress={ handleContinue }
                    disabled={ loading }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "#F7FDFF",
        padding: 20,
        paddingTop: 80,
        alignItems: "center",
    },
    backBtn: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1C2C3A",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7A8C",
        marginBottom: 32,
        textAlign: "center",
    },
    errorText: {
        color: "#FF4D4F",
        fontSize: 14,
        marginBottom: 8,
    },
    resendText: {
        color: "#048EC3",
        marginBottom: 24,
    },
    buttonWrapper: {
        width: "100%",
    },
} );

export default VerifyCodeScreen;
