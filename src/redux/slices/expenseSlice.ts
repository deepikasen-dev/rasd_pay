// src/store/expensesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";


export const fetchExpenses = createAsyncThunk(
    "expenses/fetch",
    async ( params: { page: number; limit: number }, { rejectWithValue } ) => {
        try {
            return await apiRequest( "/fetchExpenses", "GET", undefined, params );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

export const fetchExpenseDetails = createAsyncThunk(
    "expenses/fetchDetails",
    async ( id: number, { rejectWithValue } ) => {
        try {
            return await apiRequest( `/fetchExpenseDetails/${ id }`, "GET" );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

interface ExpensesState {
    loading: boolean;
    error: string | null;
    list: any[];
    selectedExpense: any | null;
}

const initialState: ExpensesState = {
    loading: false,
    error: null,
    list: [],
    selectedExpense: null,
};

const expensesSlice = createSlice( {
    name: "expenses",
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchExpenses.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( fetchExpenses.fulfilled, ( state, action ) => {
                state.loading = false;
                state.list = action.payload.data;
            } )
            .addCase( fetchExpenses.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } )
            .addCase( fetchExpenseDetails.fulfilled, ( state, action ) => {
                state.selectedExpense = action.payload.data;
            } );
    },
} );

export default expensesSlice.reducer;
