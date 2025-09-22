// src/components/BackButton.tsx
import React from "react";
import { TouchableOpacity } from "react-native";
import SvgImages from "../utils/svgImages";

interface BackButtonProps {
    onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ( { onPress } ) => {
    return (
        <TouchableOpacity onPress={ onPress }>
            <SvgImages.BackSVG style={ { marginLeft: 12 } } />
        </TouchableOpacity>
    );
};

export default BackButton;
