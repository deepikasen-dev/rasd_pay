import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
}

interface NotificationsScreenProps {
    notifications?: Notification[];
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ( {
    notifications,
} ) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.header }>Notifications</Text>

            <FlatList
                data={ notifications }
                keyExtractor={ ( item ) => item.id }
                renderItem={ ( { item } ) => (
                    <View
                        style={ [
                            styles.card,
                            item.read ? styles.readCard : styles.unreadCard,
                        ] }
                    >
                        <Text style={ styles.title }>{ item.title }</Text>
                        <Text style={ styles.message }>{ item.message }</Text>
                        <Text style={ styles.date }>{ item.date }</Text>
                    </View>
                ) }
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    unreadCard: { backgroundColor: "#EFF6FF" },
    readCard: { backgroundColor: "#F9FAFB" },
    title: { fontWeight: "600", color: "#111" },
    message: { color: "#555", marginTop: 2 },
    date: { color: "#999", fontSize: 12, marginTop: 4 },
} );

export default NotificationsScreen;
