import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../../../utils/otherStrings";
import svgImages from "../../../utils/svgImages";
import colors from "../../../utils/colors";
import Routes from "../../../utils/Routes";

type Props = NativeStackScreenProps<any>;

const SignInScreen: React.FC<Props> = ( { navigation } ) => {
    const [ selectedTab, setSelectedTab ] = useState<"email" | "phone">( "email" );

    return (
        <View style={ styles.container }>
             <svgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>Welcome Back</Text>
            <Text style={ styles.subtitle }>Sign in to your RASD Pay account</Text>

            {/* Tabs */ }
            <View style={ styles.tabRow }>
                <TouchableOpacity
                    style={ [
                        styles.tab,
                        selectedTab === "email" && styles.tabActive,
                    ] }
                    onPress={ () => setSelectedTab( "email" ) }
                >
                    <Text
                        style={ [
                            styles.tabText,
                            selectedTab === "email" && styles.tabTextActive,
                        ] }
                    >
                        Email
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ [
                        styles.tab,
                        selectedTab === "phone" && styles.tabActive,
                    ] }
                    onPress={ () => setSelectedTab( "phone" ) }
                >
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
                />
            ) : (
                <TextInput
                    placeholder="Enter your phone number"
                    style={ styles.input }
                    keyboardType="phone-pad"
                />
            ) }

            {/* Remember me */ }
            <View style={ styles.rememberRow }>
                <TouchableOpacity style={ styles.checkbox } />
                <Text style={ styles.rememberText }>Remember me</Text>
            </View>

            <CustomButton
                title={otherStrings.continue}
                onPress={ ()=>navigation.navigate(Routes.VERIFY_CODE)}
            />

            {/* Support */ }
            <TouchableOpacity style={ styles.support }>
                <Text style={ styles.supportText }>💬 Customer Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 20,
        paddingTop: 100,
        alignItems:'center',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 24,
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
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#E0E6ED",
        borderRadius: 8,
        alignItems: "center",
    },
    tabActive: {
        backgroundColor: "#E9F7FA",
        borderColor: "#048EC3",
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
        width:'100%',
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
       alignItems:'flex-start',
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
        width:'100%',
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: "#F0F6FA",
        borderRadius: 8,
        alignItems: "center",
    },
    supportText: {
        color: "#048EC3",
        fontSize: 15,
        fontWeight: "500",
    },
} );

export default SignInScreen;
