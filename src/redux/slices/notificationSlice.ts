import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";
import { ApiResponse } from "../../types/api";


interface Notification {
    id: number;
    type: string;
    payload: { title?: string; body?: string };
    created_at: string;
}

interface NotificationsState {
    loading: boolean;
    error: string | null;
    list: Notification[];
}

const initialState: NotificationsState = {
    loading: false,
    error: null,
    list: [],
};

// 🔹 Get notifications
export const getNotifications = createAsyncThunk<
    ApiResponse<Notification[]>, // ✅ return type
    { page: number; limit: number }, // ✅ params
    { rejectValue: string } // ✅ reject type
>( "notifications/get", async ( params, { rejectWithValue } ) => {
    try {
        return ( await apiRequest(
            "/getNotifications",
            "GET",
            undefined,
            params
        ) ) as ApiResponse<Notification[]>;
    } catch ( err: any ) {
        return rejectWithValue( err.message );
    }
} );

// 🔹 Delete notification
export const deleteNotification = createAsyncThunk<
    { id: number }, // ✅ return type
    number, // ✅ param (notification id)
    { rejectValue: string }
>( "notifications/delete", async ( id, { rejectWithValue } ) => {
    try {
        const response = ( await apiRequest(
            `/deleteNotification/${ id }`,
            "POST"
        ) ) as ApiResponse<null>;

        if ( !response.success ) {
            return rejectWithValue( response.message || "Failed to delete" );
        }

        return { id };
    } catch ( err: any ) {
        return rejectWithValue( err.message );
    }
} );

const notificationsSlice = createSlice( {
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            // 🟢 GET
            .addCase( getNotifications.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase(
                getNotifications.fulfilled,
                ( state, action: PayloadAction<ApiResponse<Notification[]>> ) => {
                    state.loading = false;
                    state.list = action.payload.data ?? [];
                }
            )
            .addCase( getNotifications.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload ?? "Something went wrong";
            } )

            // 🟢 DELETE
            .addCase(
                deleteNotification.fulfilled,
                ( state, action: PayloadAction<{ id: number }> ) => {
                    console.log(action, " action");
                    state.list = state.list.filter( ( n ) => n.id !== action.payload.id );
                }
            )
            .addCase( deleteNotification.rejected, ( state, action ) => {
                console.log("..rejected");
                state.error = action.payload ?? "Delete failed";
            } );
    },
} );

export default notificationsSlice.reducer;
