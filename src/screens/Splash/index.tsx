import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Routes from '../../utils/Routes';
import otherStrings from '../../utils/otherStrings';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useStatusBarColor } from '../../context';
import SvgImages from '../../utils/svgImages';
import CircularLoader from '../../components/CircularLoader';
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
            {/* Left Decorative Image */ }
            <Image
                source={ require( '../../assets/pngs/Splash1.png' ) }
                style={ styles.leftImage }
                resizeMode="contain"
            />

            {/* Right Decorative Image */ }
            <Image
                source={ require( '../../assets/pngs/Splash2.png' ) }
                style={ styles.rightImage }
                resizeMode="contain"
            />

            <SvgImages.AppLogoSVG style={ styles.logo } />
            <Text style={ styles.title }>{ otherStrings.appName }</Text>
            {/* <ActivityIndicator size="small" color="#ffffff" style={ { marginTop: 20 } } /> */ }
            <View style={ styles.loaderWrap }>
                <CircularLoader
                    size={ 30 }
                    strokeWidth={ 5 }
                    color="#ffffff"
                    backgroundColor="rgba(255,255,255,0.18)"
                    arcSweep={ 0.23 }
                    speed={ 1800 }
                />
            </View>
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
    },
    leftImage: {
        position: 'absolute',
        left: 0,
        top: '10%', 
    
    },
    rightImage: {
        position: 'absolute',
        right: 0,
        top: '60%', 
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
    loaderWrap: { marginTop: 8 },
} );