import React, { useState } from "react";
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ProfileScreenProps {
    name?: string;
    profileImage?: string;
    onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ( {
    name,
    profileImage,
    onLogout,
} ) => {
    const [ language, setLanguage ] = useState( "English" );
    const [ biometricEnabled, setBiometricEnabled ] = useState( false );
    const [ notificationsEnabled, setNotificationsEnabled ] = useState( true );

    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Profile & Settings</Text>

            <View style={ styles.profileBox }>
                <TouchableOpacity>
                    <Image
                        source={ {
                            uri:
                                profileImage ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        } }
                        style={ styles.avatar }
                    />
                </TouchableOpacity>
                <Text style={ styles.name }>{ name }</Text>
            </View>

            <Text style={ styles.sectionTitle }>PREFERENCES</Text>

            <View style={ styles.card }>
                <Text style={ styles.label }>Language</Text>
                <Picker
                    selectedValue={ language }
                    onValueChange={ ( val ) => setLanguage( val ) }
                >
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Spanish" value="Spanish" />
                    <Picker.Item label="French" value="French" />
                </Picker>
            </View>

            <View style={ styles.toggleCard }>
                <Text style={ styles.label }>Biometric Login</Text>
                <Switch value={ biometricEnabled } onValueChange={ setBiometricEnabled } />
            </View>

            <View style={ styles.toggleCard }>
                <Text style={ styles.label }>App Notifications</Text>
                <Switch
                    value={ notificationsEnabled }
                    onValueChange={ setNotificationsEnabled }
                />
            </View>

            <Text style={ styles.sectionTitle }>ACCOUNT SECURITY</Text>
            <TouchableOpacity style={ styles.card }>
                <Text style={ styles.label }>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ onLogout } style={ styles.button }>
                <Text style={ styles.buttonText }>Logout</Text>
            </TouchableOpacity>

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
