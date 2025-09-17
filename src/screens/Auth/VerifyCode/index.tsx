import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../../components/CustomButton";
import OTPInput from "../../../components/OTPInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../../../utils/otherStrings";
import SvgImages from "../../../utils/svgImages";
import Routes from "../../../utils/Routes";

type Props = NativeStackScreenProps<any>;

const VerifyCodeScreen: React.FC<Props> = ( { navigation } ) => {
    const [ code, setCode ] = useState( Array( 4 ).fill( "" ) ); // 4-digit OTP
    const [ error, setError ] = useState( false );
    const [ timer, setTimer ] = useState( 60 );

    // Countdown
    useEffect( () => {
        if ( timer > 0 ) {
            const interval = setInterval( () => setTimer( ( t ) => t - 1 ), 1000 );
            return () => clearInterval( interval );
        }
    }, [ timer ] );

    const handleContinue = () => {
        const enteredCode = code.join( "" );
        if ( enteredCode === "1234" ) {
            setError( false );
            console.log( "✅ Code verified!" );
            navigation.navigate(Routes.BOTTOM_STACK);
        } else {
            setError( true );
        }
    };

    return (
        <View style={ styles.container }>
            {/* Back button */ }
            <TouchableOpacity
                style={ styles.backBtn }
                onPress={ () => navigation.goBack() }
            >
                <SvgImages.BackSVG/>
            </TouchableOpacity>

            {/* Icon */ }
            <View style={ styles.iconWrapper }>
               <SvgImages.VerifyCodeSVG />
            </View>

            <Text style={ styles.title }>Enter Verification Code</Text>
            <Text style={ styles.subtitle }>
                We’ve sent a 4 digit code to your email
            </Text>

            {/* OTPInput component */ }
            <OTPInput length={ 4 } code={ code } setCode={ setCode } error={ error } />

            {/* Error */ }
            { error && (
                <Text style={ styles.errorText }>Invalid code, try again</Text>
            ) }

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
                <CustomButton title={otherStrings.continue} onPress={ handleContinue } />
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
