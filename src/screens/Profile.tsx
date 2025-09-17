// ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateUserSetting } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";
import CustomButton from "../components/CustomButton";
import SvgImages from "../utils/svgImages";

const ProfileScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector( ( state: RootState ) => state.auth );

    const [ language, setLanguage ] = useState( user?.language_id?.toString() || "1" );
    const [ biometricEnabled, setBiometricEnabled ] = useState( !!user?.biometric_login );
    const [ notificationsEnabled, setNotificationsEnabled ] = useState(
        user?.is_notify === 1
    );

    useEffect( () => {
        if ( user ) {
            setLanguage( user.language_id?.toString() || "1" );
            setBiometricEnabled( !!user.biometric_login );
            setNotificationsEnabled( user.is_notify === 1 );
        }
    }, [ user ] );

    const handleUpdate = ( field: string, value: any ) => {
        dispatch( updateUserSetting( { [ field ]: value } ) );
    };

    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Profile & Settings</Text>

            {/* Profile */ }
            <View style={ styles.profileBox }>
                <TouchableOpacity>
                    <Image
                        source={ {
                            uri: user?.profile_image
                                ? `https://your-api-base-url/${ user.profile_image }`
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        } }
                        style={ styles.avatar }
                    />
                </TouchableOpacity>
                <Text style={ styles.name }>{ user?.name }</Text>
            </View>

            {/* Preferences */ }
            <Text style={ styles.sectionTitle }>PREFERENCES</Text>

            <View style={ styles.card }>
                <Text style={ styles.label }>Language</Text>
                <Picker
                    selectedValue={ language }
                    onValueChange={ ( val ) => {
                        setLanguage( val );
                        handleUpdate( "language_id", val );
                    } }
                >
                    <Picker.Item label="English" value="1" />
                    <Picker.Item label="Spanish" value="2" />
                    <Picker.Item label="French" value="3" />
                </Picker>
            </View>

            <View style={ styles.toggleCard }>
                <Text style={ styles.label }>Biometric Login</Text>
                <Switch
                    value={ biometricEnabled }
                    onValueChange={ ( val ) => {
                        setBiometricEnabled( val );
                        handleUpdate( "biometric_login", val ? 1 : 0 );
                    } }
                />
            </View>

            <View style={ styles.toggleCard }>
                <Text style={ styles.label }>App Notifications</Text>
                <Switch
                    value={ notificationsEnabled }
                    onValueChange={ ( val ) => {
                        setNotificationsEnabled( val );
                        handleUpdate( "is_notify", val ? 1 : 0 );
                    } }
                />
            </View>

            {/* Security */ }
            <Text style={ styles.sectionTitle }>ACCOUNT SECURITY</Text>
            <TouchableOpacity style={ styles.card }>
                <Text style={ styles.label }>Change Password</Text>
            </TouchableOpacity>


            <CustomButton title="Logout" onPress={ () => dispatch( logout() ) } icon={<SvgImages.LogOutSVG/>} />

            <Text style={ styles.version }>App Version 1.0.0</Text>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 20, fontWeight: "600", marginBottom: 24 },
    profileBox: { alignItems: "center", marginBottom: 24 },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
    name: { fontSize: 18, fontWeight: "600" },
    sectionTitle: { color: "#666", marginBottom: 8, marginTop: 12 },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    toggleCard: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: { fontSize: 16, color: "#333" },
    button: {
        backgroundColor: "#2563EB",
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    version: { textAlign: "center", color: "#999", marginTop: 16 },
} );

export default ProfileScreen;
