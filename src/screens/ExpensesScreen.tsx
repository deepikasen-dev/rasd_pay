import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";

interface Receipt {
    id: string;
    title: string;
    amount: number;
    status: "All" | "Pending" | "Approved" | "Rejected";
}

const TABS: Array<"All" | "Pending" | "Approved" | "Rejected"> = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
];

const ExpensesScreen: React.FC<any> = ( { navigation } ) => {
    const [ activeTab, setActiveTab ] = useState<"All" | "Pending" | "Approved" | "Rejected">( "All" );

    const receipts: Receipt[] = [
        { id: "1", title: "Starbucks Coffee", amount: 12.5, status: "Approved" },
        { id: "2", title: "Uber Ride", amount: 18.0, status: "Pending" },
        { id: "3", title: "Office Depot", amount: 25.5, status: "Rejected" },
    ];

    const filteredReceipts =
        activeTab === "All"
            ? receipts
            : receipts.filter( ( r ) => r.status === activeTab );

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
            <FlatList
                data={ filteredReceipts }
                keyExtractor={ ( item ) => item.id }
                renderItem={ ( { item } ) => (
                    <TouchableOpacity
                        style={ styles.card }
                        onPress={ () => navigation.navigate( "ReceiptDetails", { receipt: item } ) }
                    >
                        <Text style={ styles.title }>{ item.title }</Text>
                        <Text>${ item.amount.toFixed( 2 ) }</Text>
                        <Text>Status: { item.status }</Text>
                    </TouchableOpacity>
                ) }
            />
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
    activeTab: {
        borderColor: "#048EC3",
    },
    tabText: { color: "#9CA3AF" },
    activeText: { color: "#048EC3", fontWeight: "600" },
    card: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    title: { fontWeight: "600", fontSize: 16 },
} );

export default ExpensesScreen;
