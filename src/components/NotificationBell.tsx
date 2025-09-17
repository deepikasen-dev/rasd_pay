import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import svgImages from "../utils/svgImages";
import Routes from "../utils/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const NotificationBell = ( { count }: { count?: number } ) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();;

    return (
        <TouchableOpacity
            style={ styles.notificationWrapper }
            onPress={ () => navigation.navigate( Routes.NOTIFICATION ) }
        >
            <svgImages.NotificationSVG style={ styles.notificationIcon } />

            { count !== undefined && count > 0 && (
                <View style={ styles.badge }>
                    <Text style={ styles.badgeText }>
                        { count > 9 ? "9+" : count }
                    </Text>
                </View>
            ) }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    notificationWrapper: {
        marginRight: 16,
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -6,
        backgroundColor: "red",
        borderRadius: 10,
        paddingHorizontal: 4,
        minWidth: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "600",
    },
} );

export default NotificationBell;
