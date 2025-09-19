import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { hp, wp } from "../utils/globalUse";
import colors from "../utils/colors";
import strings from "../utils/strings";

type Props = {
    balance: string | number;
    userName: string;
    onPress?: () => void;
};

const WalletCard: React.FC<Props> = ( { balance, userName, onPress } ) => {
    return (
        <TouchableOpacity style={ styles.wrapper } activeOpacity={ 0.8 } onPress={ onPress }>
            {/* Decorative Overlays */ }
            <Image
                source={ require( "../assets/pngs/WalletCardImg1.png" ) }
                style={ [ styles.bgImage, { bottom: 0, left: 0 } ] }
            />
            <Image
                source={ require( "../assets/pngs/WalletCardImg2.png" ) }
                style={ [ styles.bgImage, { top: 0, right:100 } ] }
            />
            <Image
                source={ require( "../assets/pngs/WalletCardImg3.png" ) }
                style={ [ styles.bgImage, { bottom: 0, right: 0 } ] }
            />

            {/* Wallet Info */ }
            <View style={ styles.walletInfo }>
                <Text style={ styles.walletLabel }>{strings.myWallet}</Text>
                <View>
                    <Text style={ styles.balance }>${ balance }</Text>
                    <Text style={ styles.subText }>{strings.totalBalance}</Text>
                </View>
                <Text style={ styles.cardName }>{ userName }</Text>
            </View>

            {/* QR Icon */ }
            {/* <Image
                source={ { uri: "https://cdn-icons-png.flaticon.com/512/84/84510.png" } }
                style={ styles.qrIcon }
            /> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    wrapper: {
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: colors.primaryText,
        flexDirection: "row",
        width: wp( 92 ),
        height: hp( 22 ),
        justifyContent: "space-between",
        paddingHorizontal: wp( 4 ),
        paddingVertical: wp( 4 ),
        position: "absolute",   // ✅ make it float 
        top:hp(15),
        alignSelf: "center",
        elevation: 6,           // ✅ shadow (Android)
        shadowColor: "#000",    // ✅ shadow (iOS)
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    bgImage: {
        position: "absolute",
        resizeMode: "contain",
    },
    walletInfo: {
        justifyContent: "space-between",
    },
    walletLabel: { color: "#fff", fontSize: wp( 3.5 ) },
    balance: { color: "#fff", fontSize: wp( 7 ), fontWeight: "700" },
    subText: { color: "#CBD5E1", fontSize: wp( 3 ) },
    cardName: { color: "#fff", fontSize: wp( 3.5 ) },
    qrIcon: { width: 28, height: 28, tintColor: "#fff" },
} );

export default WalletCard;
