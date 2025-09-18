import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, getNotifications } from "../redux/slices/notificationSlice";
import { RootState, AppDispatch } from "../redux/store";
import moment from "moment";
import svgImages from "../utils/svgImages";
import colors from "../utils/colors";
import { hp } from "../utils/globalUse";


const SVG_ICONS: any = {
    expense_approved: svgImages.ExpenseApprovedSVG,
    expense_rejected: svgImages.ExpenseRejectedSVG,
    price_alert: svgImages.PriceAlertSVG,
    budget_warning: svgImages.BudgetWarningSVG,
    default: svgImages.ExpenseApprovedSVG, // fallback
};

const NotificationsScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, loading } = useSelector( ( state: RootState ) => state.notifications );

    useEffect( () => {
        dispatch( getNotifications( { page: 1, limit: 20 } ) );
    }, [ dispatch ] );

    const renderItem = ( { item }: any ) => {
        const Icon = SVG_ICONS[ item.type ] || SVG_ICONS.default;

        return (
            <View style={ styles.card }>
                {/* Left SVG Icon */ }
                <View style={ styles.iconWrapper }>
                    <Icon/>
                </View>

                {/* Notification Content */ }
                <View style={ styles.content }>
                    <Text style={ styles.title }>
                        { item.payload?.title || formatTitle( item.type ) }
                    </Text>
                    <Text style={ styles.message } numberOfLines={ 1 }>
                        { item.payload?.body }
                    </Text>
                </View>

                {/* Right Side: Time + Delete */ }
                <View style={ styles.rightSection }>
                    <Text style={ styles.date }>
                        { moment( item.created_at ).fromNow() }
                    </Text>
                    <TouchableOpacity onPress={ () =>
                        Alert.alert(
                            "Delete Notification",
                            "Are you sure you want to delete this notification?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Delete",
                                    style: "destructive",
                                    onPress: () => {
                                        console.log(item.id)
                                        dispatch( deleteNotification( item.id ) )
                                    }
                                    ,
                                },
                            ]
                        )
                    }>
                        <svgImages.DustBinSVG width={ 18 } height={ 18 } />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const formatTitle = ( type: string ) => {
        switch ( type ) {
            case "expense_approved":
                return "Expense Approved";
            case "expense_rejected":
                return "Expense Rejected";
            case "price_alert":
                return "Price Alert";
            case "budget_warning":
                return "Budget Warning";
            default:
                return "Notification";
        }
    };

    return (
        <View style={ styles.container }>
            { loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={ list }
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={ renderItem }
                    contentContainerStyle={ { paddingBottom: 16 } }
                />
            ) }
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
    header: { fontSize: 20, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: hp(1),
        marginBottom: hp(2),
        borderColor: colors.borderColor,
        paddingVertical:hp(2),
        borderWidth:1, 
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    content: { flex: 1 },
    title: { fontWeight: "600", fontSize: 15, color: "#111827" },
    message: { color: "#6B7280", fontSize: 13, marginTop: 2 },
    rightSection: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    date: { fontSize: 11, color:"black", marginBottom: 6 },
} );

export default NotificationsScreen;
