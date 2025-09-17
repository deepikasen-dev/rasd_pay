import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ReceiptDetailsProps {
    submittedDate?: string;
    vendor?: string;
    amount?: number;
    status?: "Pending" | "Approved" | "Rejected";
    receiptUrl?: string;
}

const ReceiptDetailsScreen: React.FC<ReceiptDetailsProps> = ( {
    submittedDate,
    vendor,
    amount,
    status,
    receiptUrl,
} ) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Details</Text>

            <View style={ styles.card }>
                <Text style={ styles.label }>Submitted date</Text>
                <View style={ styles.row }>
                    <Text style={ styles.text }>{ submittedDate }</Text>
                    <Text
                        style={ [
                            styles.status,
                            status === "Pending"
                                ? styles.pending
                                : status === "Approved"
                                    ? styles.approved
                                    : styles.rejected,
                        ] }
                    >
                        { status }
                    </Text>
                </View>

                <Text style={ styles.label }>Vendor</Text>
                <Text style={ styles.text }>{ vendor }</Text>

                <Text style={ styles.label }>Amount</Text>
                <Text style={ styles.amount }>${ amount }</Text>
            </View>

            <View style={ styles.receiptBox }>
                { receiptUrl ? (
                    <Image
                        source={ { uri: receiptUrl } }
                        style={ styles.receiptImage }
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={ styles.placeholder }>No receipt uploaded</Text>
                ) }
            </View>

            <TouchableOpacity style={ styles.button }>
                <Text style={ styles.buttonText }>⬇️ Download Receipt</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    label: { color: "#666", marginTop: 8 },
    text: { fontSize: 16 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    status: {
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: "hidden",
    },
    pending: { backgroundColor: "#FEF3C7", color: "#B45309" },
    approved: { backgroundColor: "#DCFCE7", color: "#166534" },
    rejected: { backgroundColor: "#FEE2E2", color: "#991B1B" },
    amount: { fontSize: 18, fontWeight: "700", color: "#1E3A8A" },
    receiptBox: {
        backgroundColor: "#f1f1f1",
        height: 180,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    receiptImage: { width: "100%", height: "100%", borderRadius: 16 },
    placeholder: { color: "#999" },
    button: {
        backgroundColor: "#2563EB",
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
} );

export default ReceiptDetailsScreen;
