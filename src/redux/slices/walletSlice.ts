// src/store/walletSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";


export const fetchWalletHistory = createAsyncThunk(
    "wallet/fetchHistory",
    async (
        params: { userId: number; type: "spent" | "received" },
        { rejectWithValue }
    ) => {
        try {
            return await apiRequest(
                `/fetchWalletHistory/${ params.userId }`,
                "GET",
                undefined,
                { type: params.type }
            );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

interface WalletState {
    loading: boolean;
    error: string | null;
    history: any[];
}

const initialState: WalletState = {
    loading: false,
    error: null,
    history: [],
};

const walletSlice = createSlice( {
    name: "wallet",
    initialState,
    reducers: {
        clearWalletHistory: ( state ) => {
            state.history = [];
        },
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchWalletHistory.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( fetchWalletHistory.fulfilled, ( state, action ) => {
                state.loading = false;
                state.history = action.payload.data;
            } )
            .addCase( fetchWalletHistory.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } );
    },
} );

export const { clearWalletHistory } = walletSlice.actions;
export default walletSlice.reducer;
