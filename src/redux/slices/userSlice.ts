// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";


export const fetchUserDetails = createAsyncThunk(
    "user/fetchDetails",
    async ( _, { rejectWithValue } ) => {
        try {
            return await apiRequest( "/fetchUserDetails", "GET" );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

export const updateUserSetting = createAsyncThunk(
    "user/updateSetting",
    async ( payload: any, { rejectWithValue } ) => {
        try {
            return await apiRequest( "/updateUserSetting", "POST", payload );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

interface UserState {
    loading: boolean;
    error: string | null;
    user: any | null;
    funds: any | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    user: null,
    funds: null,
};

const userSlice = createSlice( {
    name: "user",
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchUserDetails.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( fetchUserDetails.fulfilled, ( state, action ) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.funds = action.payload.data.funds;
            } )
            .addCase( fetchUserDetails.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } )
            .addCase( updateUserSetting.fulfilled, ( state, action ) => {
                state.user = { ...state.user, ...action.payload.data };
            } );
    },
} );

export default userSlice.reducer;
