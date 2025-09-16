// import React from "react";
// import { View, Text, StyleSheet, Image } from "react-native";
// import GradientButton from "../components/GradientButton";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type Props = NativeStackScreenProps<any>;

// const GetStartedScreen: React.FC<Props> = ( { navigation } ) => {
//     return (
//         <View style={ styles.container }>
//             <Image
//                 source={ require( "../assets/logo.png" ) } // replace with your logo
//                 style={ styles.logo }
//             />
//             <Text style={ styles.title }>Welcome to RASD Pay</Text>
//             <Text style={ styles.subtitle }>
//                 Smart expense management for modern businesses
//             </Text>

//             <View style={ styles.buttonWrapper }>
//                 <GradientButton
//                     title="Get started"
//                     onPress={ () => navigation.navigate( "LanguageSelection" ) }
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create( {
//     container: {
//         flex: 1,
//         backgroundColor: "#F7FDFF",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//     },
//     logo: {
//         width: 80,
//         height: 80,
//         marginBottom: 24,
//         resizeMode: "contain",
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#1C2C3A",
//         marginBottom: 8,
//     },
//     subtitle: {
//         fontSize: 14,
//         textAlign: "center",
//         color: "#6B7A8C",
//         marginBottom: 40,
//     },
//     buttonWrapper: {
//         width: "100%",
//     },
// } );

// export default GetStartedScreen;
