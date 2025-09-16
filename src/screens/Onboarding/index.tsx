// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Onboarding from "react-native-onboarding-swiper";
// import { RootStackParamList } from "../../navigation/AppNavigator";
// import Routes from "../../utils/Routes";

// type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.ONBOARDING>;

// const OnboardingScreen = ( { navigation }: Props ) => {
//     const Skip = ( { ...props } ) => (
//         <TouchableOpacity { ...props }>
//             <Text style={ styles.skipText }>Skip</Text>
//         </TouchableOpacity>
//     );

//     const Next = ( { ...props } ) => (
//         <TouchableOpacity style={ styles.nextButton } { ...props }>
//             <Text style={ styles.nextText }>Next</Text>
//         </TouchableOpacity>
//     );

//     const Done = ( { ...props } ) => (
//         <TouchableOpacity style={ styles.nextButton } { ...props }>
//             <Text style={ styles.nextText }>Done</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <Onboarding
//             containerStyles={ styles.container }
//             imageContainerStyles={ styles.imageContainer }
//             titleStyles={ styles.title }
//             subTitleStyles={ styles.subtitle }
//             SkipButtonComponent={ Skip }
//             NextButtonComponent={ Next }
//             DoneButtonComponent={ Done }
//             showNext={ true }
//             showSkip={ true }
//             bottomBarHighlight={ false } // hides default bar
//             onSkip={ () => navigation.replace( "Home" ) }
//             onDone={ () => navigation.replace( "Home" ) }
//             pages={ [
//                 {
//                     backgroundColor: "#fff",
//                     image: (
//                         <Image
//                             source={ require( "./assets/onboard1.png" ) }
//                             style={ styles.image }
//                         />
//                     ),
//                     title: "Welcome",
//                     subtitle: "This is the first onboarding screen",
//                 },
//                 {
//                     backgroundColor: "#fdeb93",
//                     image: (
//                         <Image
//                             source={ require( "./assets/onboard2.png" ) }
//                             style={ styles.image }
//                         />
//                     ),
//                     title: "Track Progress",
//                     subtitle: "Easily monitor your goals and achievements.",
//                 },
//                 {
//                     backgroundColor: "#e9bcbe",
//                     image: (
//                         <Image
//                             source={ require( "./assets/onboard3.png" ) }
//                             style={ styles.image }
//                         />
//                     ),
//                     title: "Get Started",
//                     subtitle: "Jump right in and explore!",
//                 },
//             ] }
//         />
//     );
// };

// const styles = StyleSheet.create( {
//     container: {
//         flex: 1,
//         paddingTop: 50, // push content down so dots & skip show at top
//         justifyContent: "flex-start",
//     },
//     imageContainer: {
//         marginTop: 40,
//         marginBottom: 20,
//     },
//     image: {
//         width: 220,
//         height: 220,
//         resizeMode: "contain",
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginTop: 10,
//         textAlign: "center",
//     },
//     subtitle: {
//         fontSize: 16,
//         marginTop: 10,
//         color: "#555",
//         textAlign: "center",
//         paddingHorizontal: 30,
//     },
//     skipText: {
//         position: "absolute",
//         right: 20,
//         top: 20,
//         fontSize: 16,
//         color: "#333",
//     },
//     nextButton: {
//         position: "absolute",
//         bottom: 30,
//         left: 20,
//         right: 20,
//         backgroundColor: "#333",
//         paddingVertical: 15,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     nextText: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "600",
//     },
// } );

// export default OnboardingScreen;
