import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../utils/otherStrings";
import Routes from "../utils/Routes";
import SvgImages from "../utils/svgImages";

type Props = NativeStackScreenProps<any>;

const LanguageSelectionScreen: React.FC<Props> = ( { navigation } ) => {
    const [ selected, setSelected ] = useState<string>( "en" );

    return (
        <View style={ styles.container }>

            <SvgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>{otherStrings.chooseLanguage}</Text>
            <Text style={ styles.subtitle }>{otherStrings.selectLanguage}</Text>

            <TouchableOpacity
                style={ [
                    styles.languageOption,
                    selected === "en" && styles.selectedOption,
                ] }
                onPress={ () => setSelected( "en" ) }
            >
                
                <Text style={ styles.languageText }>{otherStrings.languageUS}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={ [
                    styles.languageOption,
                    selected === "ar" && styles.selectedOption,
                ] }
                onPress={ () => setSelected( "ar" ) }
            >
                <Text style={ styles.languageText }>{otherStrings.languageSA}</Text>
            </TouchableOpacity>

            <View style={ styles.buttonWrapper }>
                <CustomButton
                    title={otherStrings.continue}
                    onPress={ () => navigation.navigate( Routes.SIGN_IN ) }
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
        paddingTop: 100,
        alignItems:'center'
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
    languageOption: {
        borderWidth: 1,
        borderColor: "#E0E6ED",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        width:'100%'
    },
    selectedOption: {
        borderColor: "#048EC3",
        backgroundColor: "#E9F7FA",
    },
    languageText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1C2C3A",
    },
    buttonWrapper: {
        marginTop: 24,
        width:'100%'
    },
} );

export default LanguageSelectionScreen;
