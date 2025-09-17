import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../redux/slices/expenseSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Expense } from "../types/expense";
import colors from "../utils/colors";
import SvgImages from "../utils/svgImages";
import { wp } from "../utils/globalUse";


const TABS: Array<"All" | "pending" | "approved" | "rejected"> = [
    "All",
    "pending",
    "approved",
    "rejected",
];

const ExpensesScreen: React.FC<any> = ( { navigation } ) => {
    const [ activeTab, setActiveTab ] = useState<"All" | "pending" | "approved" | "rejected">( "All" );
    const dispatch = useDispatch<AppDispatch>();
    const { list, loading } = useSelector( ( state: RootState ) => state.expenses );


    useEffect( () => {
        dispatch( fetchExpenses( { page: 1, limit: 20 } ) );
    }, [ dispatch ] );

    const filteredReceipts =
        activeTab === "All" ? list : list.filter( ( r: Expense ) => r.status === activeTab );

    const renderCard = ( { item }: { item: Expense } ) => (
        <TouchableOpacity
            style={ styles.card }
            onPress={ () => navigation.navigate( "ReceiptDetails", { id: item.id } ) }
        >
            {/* Vendor Name + Status */ }
            <View style={ styles.headerRow }>
                <Text style={ styles.title }>{ item.vendor_name }</Text>
                <View style={ [
                    styles.statusBadge,
                    item.status === "approved"
                        ? styles.approved
                        : item.status === "pending"
                            ? styles.pending
                            : styles.rejected
                ] }>
                    <Text style={ [ styles.statusText, item.status === "approved"
                        ? styles.approvedText
                        : item.status === "pending"
                            ? styles.pendingText
                            : styles.rejectedText ] }>{ item.status }</Text>
                </View>
            </View>

            {/* Amount */ }
            <Text style={ styles.amount }>${ parseFloat( item.total_amount ).toFixed( 2 ) }</Text>

            {/* Footer: View Receipt + Date */ }
            <View style={ styles.footerRow }>
                <TouchableOpacity onPress={ () => navigation.navigate( "ReceiptDetails", { receipt: item } ) }>
                    <View style={{flexDirection:'row', gap:wp(2)}}>
                    <SvgImages.EyeOnSVG/>
                    <Text style={ styles.viewReceipt }>View Receipt</Text>
                   </View>
                </TouchableOpacity>
                <Text style={ styles.date }>{ item.invoice_date }</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={ { flex: 1, padding: 16, backgroundColor:colors.bg } }>
            {/* Tabs */ }
            <View style={ styles.tabRow }>
                { TABS.map( ( tab ) => (
                    <TouchableOpacity
                        key={ tab }
                        style={ [ styles.tab, activeTab === tab && styles.activeTab ] }
                        onPress={ () => setActiveTab( tab ) }
                    >
                        <Text style={ activeTab === tab ? styles.activeText : styles.tabText }>
                            { tab }
                        </Text>
                    </TouchableOpacity>
                ) ) }
            </View>

            {/* Receipt List */ }
            { loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={ filteredReceipts }
                    keyExtractor={ ( item ) => item.id.toString() }
                        renderItem={ renderCard }
                        showsVerticalScrollIndicator={false}
                />
            ) }
        </View>
    );
};

const styles = StyleSheet.create( {
       
    tabRow: { flexDirection: "row", marginBottom: 16, backgroundColor: "#F1F5F9", padding: 10,borderRadius:10 },
    tab: {
        flex: 1,
        paddingVertical:10,
        paddingHorizontal: 2,
        borderBottomWidth: 2,
        borderColor: "transparent",
        alignItems: "center",
    },
    activeTab: { backgroundColor: "#fff", borderRadius:6 },
    tabText: { color: "#9CA3AF", textTransform: "capitalize" },
    activeText: { color: colors.primaryText, fontWeight: "600" },

    card: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        borderColor: '#E0E0E0',
        borderWidth:1,
        
        
    },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { fontWeight: "600", fontSize: 16 },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    approved: { backgroundColor: colors.approvedBG },
    pending: { backgroundColor: colors.pendingBG},
    rejected: { backgroundColor: colors.rejectedBG },
    approvedText: { color: colors.approvedText },
    pendingText: { color: colors.pendingText },
    rejectedText: { color: colors.errorText},
    statusText: { fontSize: 12, fontWeight: "400", textTransform: "capitalize" },

    amount: { fontSize: 18, fontWeight: "700", marginTop: 8 },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    viewReceipt: { color: "#048EC3", fontWeight: "500" },
    date: { color: "#6B7280", fontSize: 12 },
} );

export default ExpensesScreen;
