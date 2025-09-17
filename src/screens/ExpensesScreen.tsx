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

interface Receipt {
    id: number;
    vendor_name: string;
    total_amount: string;
    status: "pending" | "approved" | "rejected";
    invoice_date: string;
    invoice_url: string;
}

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
        activeTab === "All" ? list : list.filter( ( r: Receipt ) => r.status === activeTab );

    const renderCard = ( { item }: { item: Receipt } ) => (
        <TouchableOpacity
            style={ styles.card }
            onPress={ () => navigation.navigate( "ReceiptDetails", { receipt: item } ) }
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
                    <Text style={ styles.statusText }>{ item.status }</Text>
                </View>
            </View>

            {/* Amount */ }
            <Text style={ styles.amount }>${ parseFloat( item.total_amount ).toFixed( 2 ) }</Text>

            {/* Footer: View Receipt + Date */ }
            <View style={ styles.footerRow }>
                <TouchableOpacity onPress={ () => navigation.navigate( "ReceiptDetails", { receipt: item } ) }>
                    <Text style={ styles.viewReceipt }>👁️ View Receipt</Text>
                </TouchableOpacity>
                <Text style={ styles.date }>{ item.invoice_date }</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={ { flex: 1, padding: 16 } }>
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
                />
            ) }
        </View>
    );
};

const styles = StyleSheet.create( {
    tabRow: { flexDirection: "row", marginBottom: 16 },
    tab: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: "transparent",
        alignItems: "center",
    },
    activeTab: { borderColor: "#048EC3" },
    tabText: { color: "#9CA3AF" },
    activeText: { color: "#048EC3", fontWeight: "600" },

    card: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { fontWeight: "600", fontSize: 16 },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    approved: { backgroundColor: "#D1FAE5" },
    pending: { backgroundColor: "#FEF3C7" },
    rejected: { backgroundColor: "#FECACA" },
    statusText: { fontSize: 12, fontWeight: "500", textTransform: "capitalize" },

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
