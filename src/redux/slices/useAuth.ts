import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { restoreSession } from "./authSlice";

export function useAuth() {
    const dispatch = useDispatch();

    useEffect( () => {
        const loadSession = async () => {
            const token = await AsyncStorage.getItem( "token" );
            const user = await AsyncStorage.getItem( "user" );
            if ( token && user ) {
                dispatch( restoreSession( { token, user: JSON.parse( user ) } ) );
            }
        };
        loadSession();
    }, [ dispatch ] );
}
