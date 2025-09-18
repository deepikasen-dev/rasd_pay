import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Routes from '../../utils/Routes';
import otherStrings from '../../utils/otherStrings';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useStatusBarColor } from '../../context';
import SvgImages from '../../utils/svgImages';
// import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.SPALSH>;

const SplashScreen = ( { navigation }: Props ) => {
    // const navigation = useNavigation();

    useEffect( () => {
        setTimeout( () => {
            navigation.replace( Routes.ONBOARDING );  // Navigate to next screen after 2 seconds
        }, 2000 );
    }, [ navigation ] );
    const { setColor } = useStatusBarColor();
    useFocusEffect(
        React.useCallback( () => {
            setColor( colors.primary1 );

            return () => {
                setColor( colors.lightBG );  // Reset when unmounted
            };
        }, [] )
    );

    return (




        <LinearGradient
            colors={ [ colors.primary1, colors.secondory ] }
            style={ styles.container }
            start={ { x: 0, y: 0 } } // top-left
            end={ { x: 1, y: 1 } }   // bottom-right
        >


            <SvgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>{ otherStrings.appName }</Text>
            {/* <ActivityIndicator size="small" color="#ffffff" style={ { marginTop: 20 } } /> */ }

            <Text style={ styles.version }>{ otherStrings.appVersion }</Text>
        </LinearGradient>


    );
};

export default SplashScreen;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary1,
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    version: {
        position: 'absolute',
        bottom: 20,
        fontSize: 14,
        color: '#ffffff',
    },
} );
