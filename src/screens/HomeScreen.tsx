import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../utils/colors";
import { useStatusBarColor } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { hp } from "../utils/globalUse";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SvgImages from "../utils/svgImages";
import NotificationBell from "../components/NotificationBell";


const HomeScreen: React.FC = () => {
    const [ modalVisible, setModalVisible ] = useState( false );
    const { setColor } = useStatusBarColor();

    // ✅ Get user & funds from Redux
    const user = useSelector( ( state: RootState ) => state.auth.user );
    const funds = useSelector( ( state: RootState ) => state.auth.funds );
    // console.log( user );
    console.log( funds );

    useFocusEffect(
        React.useCallback( () => {
            setColor( colors.primary1 );
            return () => {
                setColor( colors.lightBG );
            };
        }, [] )
    );

    return (
        <SafeAreaView style={ styles.container }>
            {/* Top Section with Gradient */ }
            <LinearGradient
                colors={ [ colors.primary1, colors.secondory ] }
                style={ styles.headerBackground }
            >
                {/* Top Row: Profile + Notifications */ }
                <View style={ styles.topRow }>
                    <View style={ styles.userInfo }>
                        <Image
                            source={ {
                                uri: user?.profile_image
                                    ? `https://your-api.com/${ user.profile_image }`
                                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png", // fallback avatar
                            } }
                            style={ styles.avatar }
                        />
                        {/* <Image source={ { uri: "invoices/user_11/profile_68ca628951577_2025-09-17.jpg" } } style={ styles.avatar } /> */ }
                        <View>
                            <Text style={ styles.welcome }>Welcome Back</Text>
                            <Text style={ styles.username }>{ user?.name || "Guest" }</Text>
                        </View>
                    </View>

                    <NotificationBell count={ user?.notification_count } />

                </View>

                {/* Wallet Card */ }
                { !modalVisible && <TouchableOpacity
                    style={ styles.walletCard }
                    activeOpacity={ 0.8 }
                    onPress={ () => setModalVisible( true ) }
                >
                    <View>
                        <Text style={ styles.walletLabel }>My Wallet</Text>
                        <Text style={ styles.balance }>
                            ${ funds?.remaining_balance || "0.00" }
                        </Text>
                        <Text style={ styles.subText }>Total balance</Text>
                        <Text style={ styles.cardName }>{ user?.name }</Text>
                    </View>
                    <Image
                        source={ {
                            uri: "https://cdn-icons-png.flaticon.com/512/84/84510.png",
                        } }
                        style={ styles.qrIcon }
                    />
                </TouchableOpacity>
                }

            </LinearGradient>

            {/* Bottom Section */ }
            {
                !modalVisible && <View style={ styles.bottomSection }>
                    <View style={ styles.row }>
                        <View style={ styles.actionCard }>
                            <Image
                                source={ {
                                    uri: "https://cdn-icons-png.flaticon.com/512/929/929430.png",
                                } }
                                style={ styles.actionIcon }
                            />
                            <Text style={ styles.actionLabel }>FUND RECEIVED</Text>
                            <Text style={ styles.amount }>${ funds?.funds_received || "0.00" }</Text>
                        </View>

                        <View style={ [ styles.actionCard, { backgroundColor: "#E0F2FE" } ] }>
                            <Image
                                source={ {
                                    uri: "https://cdn-icons-png.flaticon.com/512/929/929440.png",
                                } }
                                style={ styles.actionIcon }
                            />
                            <Text style={ styles.actionLabel }>FUND SPENT</Text>
                            <Text style={ [ styles.amount, { color: "#0284C7" } ] }>
                                ${ funds?.funds_spent || "0.00" }
                            </Text>
                        </View>
                    </View>
                </View>

            }

            {/* Wallet Modal */ }
            <Modal
                visible={ modalVisible }
                animationType="slide"
                transparent={ true }
                onRequestClose={ () => setModalVisible( false ) }
            >
                <View style={ styles.modalOverlay }>
                    <View style={ styles.modalContent }>
                        <Text style={ styles.modalTitle }>Wallet Summary</Text>

                        {/* Row 1 */ }
                        <View style={ styles.summaryCard }>
                            <View>

                                <Text style={ styles.summaryLabel }>Funds Received</Text>
                                <Text style={ styles.summaryAmount }>
                                    ${ funds?.funds_received || "0.00" }
                                </Text>
                            </View>

                            <View>
                                <SvgImages.CircleArrowDownSVG />
                            </View>
                        </View>

                        {/* Row 2 */ }
                        <View style={ styles.summaryCard }>
                            <View>

                                <Text style={ styles.summaryLabel }>Funds Spent</Text>
                                <Text style={ styles.summaryAmount }>
                                    ${ funds?.funds_spent || "0.00" }
                                </Text>
                            </View>

                            <View>
                                <SvgImages.CircleArrowUpSVG />
                            </View>
                        </View>

                        {/* Row 3 */ }
                        <View style={ styles.summaryCard }>
                            <View>

                                <Text style={ styles.summaryLabel }>Remaining Balance</Text>
                                <Text style={ styles.summaryAmount }>
                                    ${ funds?.remaining_balance || "0.00" }
                                </Text>
                            </View>

                            <View>
                                <SvgImages.BalanceSVG />
                            </View>
                        </View>

                        {/* Close Button */ }
                        <Pressable
                            style={ styles.closeButton }
                            onPress={ () => setModalVisible( false ) }
                        >
                            <Text style={ styles.closeText }>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: "#F9FAFB" },
    headerBackground: {
        paddingBottom: 100,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 20,
        alignItems: "center",
    },
    userInfo: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
    welcome: { color: "#fff", fontSize: 14 },
    username: { color: "#fff", fontSize: 18, fontWeight: "600" },
    notificationWrapper: { position: "relative" },
    notificationIcon: { width: 28, height: 28, tintColor: "#fff" },
    badge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#EF4444",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

    walletCard: {
        marginHorizontal: 16,
        backgroundColor: colors.walletColor,
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    walletLabel: { color: "#fff", fontSize: 14, marginBottom: 6 },
    balance: { color: "#fff", fontSize: 28, fontWeight: "700" },
    subText: { color: "#CBD5E1", fontSize: 12, marginBottom: 8 },
    cardName: { color: "#fff", fontSize: 14 },
    qrIcon: { width: 24, height: 24, tintColor: "#fff" },

    bottomSection: { marginTop: -60, paddingHorizontal: 16 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    actionCard: {
        flex: 1,
        backgroundColor: "#F1F5F9",
        marginHorizontal: 4,
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
    },
    actionIcon: { width: 32, height: 32, marginBottom: 8, tintColor: "#0369A1" },
    actionLabel: { fontSize: 12, fontWeight: "600", color: "#334155" },
    amount: { fontSize: 16, fontWeight: "700", marginTop: 6, color: "#0F172A" },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",

    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        height: hp( 70 ),
    },
    modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 20 },
    summaryCard: {
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 30,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: { fontSize: 14, color: "#475569" },
    summaryAmount: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
    summaryRight: { flexDirection: "row", alignItems: "center", gap: 12 },
    circleIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#06B6D4",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "#0F172A",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    closeText: { color: "#fff", fontWeight: "600" },
} );

export default HomeScreen;
