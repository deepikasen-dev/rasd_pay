import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";
import { Expense } from "../../types/expense";
import { ApiResponse } from "../../types/api";

// Fetch all expenses
export const fetchExpenses = createAsyncThunk<
    ApiResponse<Expense[]>, // ✅ success type
    { page: number; limit: number }, // ✅ args type
    { rejectValue: string } // ✅ error type
>(
    "expenses/fetch",
    async ( params, { rejectWithValue } ) => {
        try {
            return await apiRequest( "/fetchExpenses", "GET", undefined, params );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

// Fetch one expense
export const fetchExpenseDetails = createAsyncThunk<
    ApiResponse<Expense>, // ✅ success type
    number,               // ✅ args type
    { rejectValue: string }
>(
    "expenses/fetchDetails",
    async ( id, { rejectWithValue } ) => {
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
    list: Expense[];
    selectedExpense: Expense | null;
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
   
    reducers: {
        clearSelectedExpense: ( state ) => {
            state.selectedExpense = null;
        },
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchExpenses.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( fetchExpenses.fulfilled, ( state, action ) => {
                state.loading = false;
                state.list = action.payload.data as Expense[];
            } )
            .addCase( fetchExpenses.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } )
            .addCase( fetchExpenseDetails.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( fetchExpenseDetails.fulfilled, ( state, action ) => {
                state.loading = false;
                state.selectedExpense = action.payload.data as Expense;
            } )
            .addCase( fetchExpenseDetails.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } );
    },
} );


export const { clearSelectedExpense } = expensesSlice.actions;
export default expensesSlice.reducer;