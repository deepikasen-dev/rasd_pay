import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../../../utils/otherStrings";
import svgImages from "../../../utils/svgImages";
import colors from "../../../utils/colors";
import Routes from "../../../utils/Routes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { sendVerificationCode } from "../../../redux/slices/authSlice";
import { hp, wp } from "../../../utils/globalUse";
import LinearGradient from "react-native-linear-gradient";

type Props = NativeStackScreenProps<any>;

const SignInScreen: React.FC<Props> = ( { navigation } ) => {
    const [ selectedTab, setSelectedTab ] = useState<"email" | "phone">( "email" );
    const [ email, setEmail ] = useState( "" );
    const [ phone, setPhone ] = useState( "" );
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector( ( state: RootState ) => state.auth );
    const language_id = useSelector( ( state: RootState ) => state.language.id ) ?? "1";

    // 🔹 Basic Validators
    const validateEmail = ( val: string ) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( val );
    const validatePhone = ( val: string ) =>
        /^[0-9]{8,15}$/.test( val ); // 8-15 digits

    const handleContinue = async () => {
        if ( selectedTab === "email" ) {
            if ( !email || !validateEmail( email ) ) {
                Alert.alert( "Invalid Email", "Please enter a valid email address" );
                return;
            }

            const result = await dispatch(
                sendVerificationCode( { language_id, email } )
            );
console.log(result);

            if ( sendVerificationCode.fulfilled.match( result ) ) {
                // ✅ success
                
                console.log( sendVerificationCode.fulfilled.match( result ) );
                
                navigation.navigate( Routes.VERIFY_CODE, { email } );
            } else if ( sendVerificationCode.rejected.match( result ) ) {
                // ❌ failure
                Alert.alert( "Error", result.payload?.message || "Something went wrong" );
            }

        } else {
            if ( !phone || !validatePhone( phone ) ) {
                Alert.alert(
                    "Invalid Phone",
                    "Please enter a valid phone number (8-15 digits)"
                );
                return;
            }

            const result = await dispatch(
                sendVerificationCode( {
                    language_id,
                    country_code: "91",
                    phone_number: phone,
                } as any )
            );

            if (
                sendVerificationCode.fulfilled.match( result ) &&
                result.payload?.success
            ) {
                navigation.navigate( Routes.VERIFY_CODE);
            } else {
                Alert.alert( "Error", result.payload?.message || "Something went wrong" );
            }
        }
    };


    return (
        <View style={ styles.container }>
            <svgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>Welcome Back</Text>
            <Text style={ styles.subtitle }>
                Sign in to your RASD Pay account
            </Text>

            {/* Tabs */ }
            <View style={ styles.tabRow }>
                <TouchableOpacity
                    style={ [
                        styles.tab,
                        selectedTab === "email" && styles.tabActive,
                    ] }
                    onPress={ () => setSelectedTab( "email" ) }
                >
                    <svgImages.EmailOffSVG/>
                    <Text
                        style={ [
                            styles.tabText,
                            selectedTab === "email" && styles.tabTextActive,
                        ] }
                    >
                        Email
                    </Text>
                    <LinearGradient
                        colors={ [ colors.primary1, colors.secondory ] }  
                        start={ { x: 0, y: 0 } }
                        end={ { x: 1, y: 1 } }>
                        
                        </LinearGradient>

                </TouchableOpacity>

                <TouchableOpacity
                    style={ [
                        styles.tab,
                        selectedTab === "phone" && styles.tabActive,
                    ] }
                    onPress={ () => setSelectedTab( "phone" ) }
                >
                    <svgImages.PhoneOffSVG/>
                    <Text
                        style={ [
                            styles.tabText,
                            selectedTab === "phone" && styles.tabTextActive,
                        ] }
                    >
                        Phone
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Input */ }
            { selectedTab === "email" ? (
                <TextInput
                    placeholder="Enter your email"
                    style={ styles.input }
                    keyboardType="email-address"
                    value={ email }
                    onChangeText={ setEmail }
                />
            ) : (
                <TextInput
                    placeholder="Enter your phone number"
                    style={ styles.input }
                    keyboardType="phone-pad"
                    value={ phone }
                    onChangeText={ setPhone }
                />
            ) }

            {/* Remember me */ }
            <View style={ styles.rememberRow }>
                <TouchableOpacity style={ styles.checkbox } />
                <Text style={ styles.rememberText }>Remember me</Text>
            </View>

            <CustomButton
                title={ loading ? "Please wait..." : otherStrings.continue }
                onPress={ handleContinue }
                disabled={ loading }
            />

            {/* Support */ }
            <TouchableOpacity style={ styles.support }>
                <svgImages.CustomerSupportSVG/>
                <Text style={ styles.supportText }>Customer Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: wp(4),
        paddingTop: hp(10),
        alignItems: "center",
    },
    logo: {
        // width: 80,
        // height: 80,
        marginBottom: hp(3),
        resizeMode: "contain",
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
        marginBottom: 24,
    },
    tabRow: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: colors.inputField,
        height: hp( 8 ),
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    tab: {
        flex: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
        height: hp( 6 ),
        flexDirection: 'row',
        gap:wp(3)
    },
    tabActive: {
     
        borderColor: "#048EC3",
        borderWidth: 1,
    },
    tabText: {
        fontSize: 16,
        color: "#6B7A8C",
    },
    tabTextActive: {
        color: "#048EC3",
        fontWeight: "600",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E6ED",
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
        fontSize: 16,
        color: "#1C2C3A",
    },
    rememberRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#6B7A8C",
        borderRadius: 4,
        marginRight: 8,
    },
    rememberText: {
        fontSize: 14,
        color: "#6B7A8C",
    },
    support: {
        width: "100%",
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: "#F0F6FA",
        borderRadius: 8,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        gap:wp(3)
    },
    supportText: {
        color: "#048EC3",
        fontSize: 15,
        fontWeight: "500",
    },
} );

export default SignInScreen;
