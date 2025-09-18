// components/CircularLoader.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedView = Animated.createAnimatedComponent( View );

type Props = {
    size?: number;               // diameter in px
    strokeWidth?: number;       // thickness of ring
    color?: string;             // color of rotating arc
    backgroundColor?: string;   // faded full circle color
    arcSweep?: number;          // portion of circle used by arc (0..1). 0.25 = 25% arc
    speed?: number;             // rotation duration in ms
};

export default function CircularLoader( {
    size = 48,
    strokeWidth = 4,
    color = "#FFFFFF",
    backgroundColor = "rgba(255,255,255,0.25)",
    arcSweep = 0.22,
    speed = 900,
}: Props ) {
    const spin = useRef( new Animated.Value( 0 ) ).current;

    useEffect( () => {
        const anim = Animated.loop(
            Animated.timing( spin, {
                toValue: 1,
                duration: speed,
                easing: Easing.linear,
                useNativeDriver: true,
            } )
        );
        anim.start();
        return () => anim.stop();
    }, [ spin, speed ] );

    // geometry
    const radius = ( size - strokeWidth ) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * Math.max( 0.01, Math.min( 0.95, arcSweep ) ); // safe clamp
    const gap = Math.max( 0, circumference - arcLength );

    const rotate = spin.interpolate( {
        inputRange: [ 0, 1 ],
        outputRange: [ "0deg", "360deg" ],
    } );

    return (
        <View style={ [ styles.container, { width: size, height: size } ] }>
            {/* background full faded circle */ }
            <Svg width={ size } height={ size } viewBox={ `0 0 ${ size } ${ size }` }>
                <Circle
                    cx={ cx }
                    cy={ cy }
                    r={ radius }
                    stroke={ backgroundColor }
                    strokeWidth={ strokeWidth }
                    fill="none"
                    strokeLinecap="round"
                />
            </Svg>

            {/* rotating arc overlay — we rotate the whole Svg using Animated.View */ }
            <AnimatedView
                style={ {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: size,
                    height: size,
                    transform: [ { rotate } ],
                } }
            >
                <Svg width={ size } height={ size } viewBox={ `0 0 ${ size } ${ size }` }>
                    <Circle
                        cx={ cx }
                        cy={ cy }
                        r={ radius }
                        stroke={ color }
                        strokeWidth={ strokeWidth }
                        strokeDasharray={ `${ arcLength } ${ gap }` }
                        strokeLinecap="round"
                        fill="none"
                    />
                </Svg>
            </AnimatedView>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: { justifyContent: "center", alignItems: "center" },
} );
