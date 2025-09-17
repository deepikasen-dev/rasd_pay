// src/store/notificationsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";


export const getNotifications = createAsyncThunk(
    "notifications/get",
    async ( params: { page: number; limit: number }, { rejectWithValue } ) => {
        try {
            return await apiRequest( "/getNotifications", "GET", undefined, params );
        } catch ( err: any ) {
            return rejectWithValue( err.message );
        }
    }
);

interface NotificationsState {
    loading: boolean;
    error: string | null;
    list: any[];
}

const initialState: NotificationsState = {
    loading: false,
    error: null,
    list: [],
};

const notificationsSlice = createSlice( {
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( getNotifications.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( getNotifications.fulfilled, ( state, action ) => {
                state.loading = false;
                state.list = action.payload.data;
            } )
            .addCase( getNotifications.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string;
            } );
    },
} );

export default notificationsSlice.reducer;
