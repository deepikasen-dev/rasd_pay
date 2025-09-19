import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import otherStrings from "../utils/otherStrings";
import Routes from "../utils/Routes";
import SvgImages from "../utils/svgImages";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/languageSlice";
import { hp, wp } from "../utils/globalUse";
import colors from "../utils/colors";

type Props = NativeStackScreenProps<any>;

const LanguageSelectionScreen: React.FC<Props> = ( { navigation } ) => {
    const [ selected, setSelected ] = useState<string>( "en" );
    const dispatch = useDispatch();

    // Mapping language → ID
    const languageMap: Record<string, string> = {
        en: "1",
        ar: "2",
    };

    const handleContinue = () => {
        const languageId = languageMap[ selected ];
        dispatch( setLanguage( languageId ) ); // ✅ store in Redux
        navigation.navigate( Routes.SIGN_IN );
    };

    return (
        <View style={ styles.container }>
            <SvgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>{ otherStrings.chooseLanguage }</Text>
            <Text style={ styles.subtitle }>{ otherStrings.selectLanguage }</Text>

            <TouchableOpacity
                style={ [
                    styles.languageOption,
                    selected === "en" && styles.selectedOption,
                ] }
                onPress={ () => setSelected( "en" ) }
            >
                <View style={ {
                    flexDirection: 'row',
                    gap: wp( 4 ),
                } }>
                <SvgImages.USflagSVG/>
                <Text style={ styles.languageText }>{ otherStrings.languageUS }</Text>
                </View>
                {
                    selected === "en" &&
                <SvgImages.RightSVG/>
                }
            </TouchableOpacity>

            <TouchableOpacity
                style={ [
                    styles.languageOption,
                    selected === "ar" && styles.selectedOption,
                ] }
                onPress={ () => setSelected( "ar" ) }
            >
                <View style={ {
                    flexDirection: 'row',
                    gap: wp( 4 ),
}}>
                <SvgImages.SAflagSVG/>
                <Text style={ styles.languageText }>{ otherStrings.languageSA }</Text>
                </View>
                {
                    selected === "ar" &&
                    <SvgImages.RightSVG />
                }
            </TouchableOpacity>

            <View style={ styles.buttonWrapper }>
                <CustomButton title={ otherStrings.continue } onPress={ handleContinue } />
            </View>
        </View>
    );
};


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: wp(3),
        paddingTop: hp(10),
        alignItems:'center'
    },
    logo: {
        // width: 80,
        // height: 80,
        marginBottom: hp(2),
        resizeMode: "contain",
    },
    title: {
        fontSize: wp(6),
        fontWeight: "600",
        color: colors.primaryText,
        margin: hp(1),
    },
    subtitle: {
        fontSize: wp(4),
        color: "#6B7A8C",
        marginTop: hp( 1 ),
        marginBottom:hp(2),
    },
    languageOption: {
        borderWidth: 2,
        borderColor: colors.borderColor,
        paddingHorizontal: wp(3),
        paddingVertical: hp(3),
        borderRadius: 12,
        marginBottom: hp(2),
        width: '100%',
        backgroundColor: colors.lightBG,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    selectedOption: {
        borderColor: colors.secondory,
        backgroundColor: colors.lightBG,
        borderWidth:2,
    },
    languageText: {
        fontSize: wp(4),
        fontWeight: "700",
        color: colors.primaryText,
    },
    buttonWrapper: {
        marginTop: hp(2),
        width:'100%'
    },
} );

export default LanguageSelectionScreen;
