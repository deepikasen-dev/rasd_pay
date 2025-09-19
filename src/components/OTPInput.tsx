import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { hp, wp } from "../utils/globalUse";

interface OTPInputProps {
    length?: number;
    code: string[];
    setCode: ( val: string[] ) => void;
    error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ( { length = 4, code, setCode, error } ) => {
    const inputs = useRef<Array<TextInput | null>>( [] );
    const [ focusedIndex, setFocusedIndex ] = useState<number | null>( null );

    const handleChange = ( text: string, index: number ) => {
        const newCode = [ ...code ];
        newCode[ index ] = text;
        setCode( newCode );

        if ( text && index < length - 1 ) {
            inputs.current[ index + 1 ]?.focus();
        }
    };

    return (
        <View style={ styles.inputRow }>
            { Array.from( { length } ).map( ( _, index ) => {
                const isFocused = focusedIndex === index;
                return (
                    <View
                        key={ index }
                        style={ [
                            styles.outerBorder,
                            error && styles.outerBorderError,
                            isFocused && !error && styles.outerBorderFocused,
                        ] }
                    >
                        <TextInput
                            ref={ ( ref ) => ( inputs.current[ index ] = ref ) }
                            style={ [
                                styles.input,
                                isFocused && !error && styles.inputBorderFocused,
                                error && styles.inputBorderError,
                            ] }
                            value={ code[ index ] || "" }
                            maxLength={ 1 }
                            keyboardType="number-pad"
                            onChangeText={ ( text ) => handleChange( text, index ) }
                            onFocus={ () => setFocusedIndex( index ) }
                            onBlur={ () => setFocusedIndex( null ) }
                        />
                    </View>
                );
            } ) }
        </View>

    );
};

const styles = StyleSheet.create( {
    // inputRow: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     marginBottom: 16,
    //     width: "80%",
    // },
    // input: {
    //     width: 60,
    //     height: 60,
    //     borderWidth: 1,
    //     borderColor: "#E0E6ED",
    //     borderRadius: 12,
    //     textAlign: "center",
    //     fontSize: 22,
    //     fontWeight: "600",
    //     backgroundColor: colors.bg,
    // },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp( 2 ),
        width: "80%",
    },
    outerBorder: {
        borderRadius: 8,
        padding: 0.5, // 👈 gap for inner border
    },
    outerBorderFocused: {
        borderColor: colors.secondory,
        borderWidth: 1.5,
        borderRadius: 8,
    },
    outerBorderError: {
        borderColor: colors.errorText,
        borderWidth: 1.5,
        borderRadius: 8,
    },
    input: {
        width: hp( 7 ),
        height: hp( 7 ),
        borderWidth: 2,
        borderColor: "#E0E6ED",
        borderRadius: 8,
        textAlign: "center",
        fontSize: wp( 5 ),
        fontWeight: "400",
        backgroundColor: colors.bg,
        color: colors.primaryText,
    },
    inputBorderFocused: {
        borderColor: colors.secondory,
    },
    inputBorderError: {
        borderColor: colors.errorText,
    },
} );

export default OTPInput;