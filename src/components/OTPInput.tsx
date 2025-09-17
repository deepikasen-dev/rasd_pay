import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../utils/colors";

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
            { Array.from( { length } ).map( ( _, index ) => (
                <TextInput
                    key={ index }
                    ref={ ( ref ) => ( inputs.current[ index ] = ref ) }
                    style={ [
                        styles.input,
                        error && styles.inputError,
                        focusedIndex === index && !error && styles.inputFilled, // ✅ only focused one
                    ] }
                    value={ code[ index ] || "" }
                    maxLength={ 1 }
                    keyboardType="number-pad"
                    onChangeText={ ( text ) => handleChange( text, index ) }
                    onFocus={ () => setFocusedIndex( index ) }
                    onBlur={ () => setFocusedIndex( null ) }
                />
            ) ) }
        </View>
    );
};

const styles = StyleSheet.create( {
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        width: "80%",
    },
    input: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#E0E6ED",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        backgroundColor: colors.bg,
    },
    inputFilled: {
        borderColor: "#048EC3", // Highlight color for active input
    },
    inputError: {
        borderColor: "#FF4D4F",
        
    },
} );

export default OTPInput;
