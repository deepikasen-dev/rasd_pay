import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearSelectedExpense, fetchExpenseDetails } from "../redux/slices/expenseSlice";
import colors from "../utils/colors";
import CustomButton from "../components/CustomButton";
import svgImages from "../utils/svgImages";
import { hp } from "../utils/globalUse";

type RootStackParamList = {
    ReceiptDetails: { id: number };
};

type ReceiptDetailsRouteProp = RouteProp<RootStackParamList, "ReceiptDetails">;

const ReceiptDetailsScreen: React.FC = () => {
    const route = useRoute<ReceiptDetailsRouteProp>();
    const { id } = route.params;

    const dispatch = useDispatch<AppDispatch>();
    const { selectedExpense, loading, error } = useSelector(
        ( state: RootState ) => state.expenses
    );

    useEffect( () => {
        dispatch( fetchExpenseDetails( id ) );
        return () => {
            dispatch( clearSelectedExpense() ); // 🔹 clear when unmounts
        };
    }, [ dispatch, id ] );

    if ( loading ) {
        return (
            <View style={ styles.center }>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if ( error ) {
        return (
            <View style={ styles.center }>
                <Text style={ { color: "red" } }>{ error }</Text>
            </View>
        );
    }

    if (  !selectedExpense ) {
        return (
            <View style={ styles.center }>
                <Text>No details found</Text>
            </View>
        );
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.card }>
                <Text style={ styles.label }>Submitted date</Text>
                <View style={ styles.row }>
                    <Text style={ styles.text }>{ selectedExpense.invoice_date }</Text>
                    <Text
                        style={ [
                            styles.status,
                            selectedExpense.status === "pending"
                                ? styles.pending
                                : selectedExpense.status === "approved"
                                    ? styles.approved
                                    : styles.rejected,
                        ] }
                    >
                        { selectedExpense.status }
                    </Text>
                </View>

                <Text style={ styles.label }>Vendor</Text>
                <Text style={ styles.text }>{ selectedExpense.vendor_name }</Text>

                <Text style={ styles.label }>Amount</Text>
                <Text style={ styles.amount }>${ selectedExpense.total_amount }</Text>
            </View>

            <View style={ styles.receiptBox }>
                { selectedExpense.invoice_url ? (
                    <Image
                        source={ { uri: selectedExpense.invoice_url } }
                        style={ styles.receiptImage }
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={ styles.placeholder }>No receipt uploaded</Text>
                ) }
            </View>

            <View style={ styles.button } >
                <CustomButton title="Download Receipt" onPress={ () => console.log( "" )
                } icon={ <svgImages.DownloadSVG/>} />
           </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
    header: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderColor: colors.borderColor,
       borderWidth:1,
    },
    label: { color: "#666", marginTop: 8 },
    text: { fontSize: 16 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    status: {
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pending: { backgroundColor: "#FEF3C7", color: "#B45309" },
    approved: { backgroundColor: "#DCFCE7", color: "#166534" },
    rejected: { backgroundColor: "#FEE2E2", color: "#991B1B" },
    amount: { fontSize: 18, fontWeight: "700", color: colors.primaryText },
    receiptBox: {
        backgroundColor: colors.lightBG,
        height: hp(30),
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        borderColor: colors.borderColor,
        borderWidth:1,
    },
    receiptImage: {
        width: "90%", height: "90%", borderRadius: 16, backgroundColor: "#f1f1f1", borderColor: colors.borderColor,
        borderWidth: 1, },
    placeholder: { color: "#999" },
    button: {
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:colors.bg },
} );

export default ReceiptDetailsScreen;
