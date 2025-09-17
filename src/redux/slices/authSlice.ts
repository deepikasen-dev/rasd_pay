// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../../api/api";
import { ApiResponse } from "../../types/api";
import { User, Funds } from "../../types/user";
import { RootState } from "../store";

// 🔹 Send Verification Code
export const sendVerificationCode = createAsyncThunk<
    ApiResponse<{ otp?: string }>,
    { language_id: string; email?: string; country_code?: string; phone_number?: string },
    { rejectValue: { message: string } }
>( "auth/sendVerificationCode", async ( payload, { rejectWithValue } ) => {
    try {
        const response: ApiResponse<{ otp?: string }> = await apiRequest(
            "/sendVerificationCode",
            "POST",
            payload
        );

        if ( !response.success ) {
            return rejectWithValue( { message: response.message } );
        }

        return response;
    } catch ( err: any ) {
        return rejectWithValue( { message: err.message || "Something went wrong" } );
    }
} );

// 🔹 Verify Code
export const verifyCode = createAsyncThunk<
    ApiResponse<{ user: User; access_token: string }>,
    { email: string; otp_code: string },
    { rejectValue: string }
>( "auth/verifyCode", async ( payload, { rejectWithValue } ) => {
    try {
        const data: ApiResponse<{ user: User; access_token: string }> =
            await apiRequest( "/verifyCode", "POST", payload );

        if ( data?.data?.access_token ) {
            await AsyncStorage.setItem( "token", data.data.access_token );
        }

        return data;
    } catch ( err: any ) {
        return rejectWithValue( err.message );
    }
} );

// 🔹 Load token at app startup
export const loadToken = createAsyncThunk( "auth/loadToken", async () => {
    const token = await AsyncStorage.getItem( "token" );
    return token;
} );

// 🔹 Fetch User Details
export const fetchUserDetails = createAsyncThunk<
    ApiResponse<{ user: User; funds: Funds }>,
    void,
    { rejectValue: string }
>( "auth/fetchUserDetails", async ( _, { getState, rejectWithValue } ) => {
    try {
        const state = getState() as RootState;
        const token = state.auth.token;
        if ( !token ) throw new Error( "No token found" );

        const data: ApiResponse<{ user: User; funds: Funds }> = await apiRequest(
            "/fetchUserDetails",
            "GET",
            undefined,
            token
        );
        return data;
    } catch ( err: any ) {
        return rejectWithValue( err.message );
    }
} );

// 🔹 Logout → clear token
export const logout = createAsyncThunk( "auth/logout", async () => {
    await AsyncStorage.removeItem( "token" );
    return null;
} );

interface AuthState {
    loading: boolean;
    restoring: boolean;
    error: string | null;
    token: string | null;
    user: User | null;
    funds: Funds | null;
}

const initialState: AuthState = {
    loading: false,
    restoring: true,
    error: null,
    token: null,
    user: null,
    funds: null,
};

const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        clearError: ( state ) => {
            state.error = null;
        },
    },
    extraReducers: ( builder ) => {
        builder
            // send OTP
            .addCase( sendVerificationCode.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( sendVerificationCode.fulfilled, ( state ) => {
                state.loading = false;
            } )
            .addCase( sendVerificationCode.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to send OTP";
            } )

            // verify OTP
            .addCase( verifyCode.pending, ( state ) => {
                state.loading = true;
            } )
            .addCase( verifyCode.fulfilled, ( state, action ) => {
                state.loading = false;
                state.token = action.payload.data.access_token;
                state.user = action.payload.data.user; // ✅ hydrate user immediately
            } )
            .addCase( verifyCode.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload || "Failed to verify code";
            } )

            // load saved token
            .addCase( loadToken.pending, ( state ) => {
                state.restoring = true;
                state.error = null;
            } )
            .addCase( loadToken.fulfilled, ( state, action ) => {
                state.token = action.payload;
                state.restoring = false;
            } )
            .addCase( loadToken.rejected, ( state ) => {
                state.restoring = false;
            } )

            // fetch user details
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
                state.error = action.payload || "Failed to fetch user";
            } )

            // logout
            .addCase( logout.fulfilled, ( state ) => {
                state.token = null;
                state.user = null;
                state.funds = null;
            } );
    },
} );

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
