import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../utils/colors";
import { hp, wp } from "../utils/globalUse";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
    disabled?: boolean; // New prop
}

const CustomButton: React.FC<CustomButtonProps> = ( {
    title,
    onPress,
    icon,
    disabled = false,
} ) => {
    return (
        <TouchableOpacity
            style={ [ styles.buttonWrapper, disabled && styles.disabledButton ] }
            onPress={ disabled ? undefined : onPress }
            activeOpacity={ 0.8 }
            disabled={ disabled }
        >
            <LinearGradient
                colors={
                    disabled
                        ? [ colors.primary1 + "80", colors.secondory + "80", colors.secondory + "80" ] // Slightly transparent colors when disabled
                        : [ colors.primary1, colors.secondory ]
                }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
                style={ styles.gradient }
            >
                <View style={ styles.content }>
                    { icon && <View style={ styles.icon }>{ icon }</View> }
                    <Text style={ styles.text }>{ title }</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    buttonWrapper: {
        width: "100%",
        borderRadius: 8,
        overflow: "hidden",
    },
    disabledButton: {
        opacity: 0.6, // Reduce opacity when disabled
    },
    gradient: {
        paddingVertical: hp( 1.7 ),
        paddingHorizontal: wp( 2 ),
        borderRadius: 8,
        alignItems: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: wp( 4 ),
        fontWeight: "600",
    },
    icon: {
        marginRight: 8,
    },
} );

export default CustomButton;
