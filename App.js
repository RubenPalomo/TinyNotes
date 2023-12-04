import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Main from "./screens/Main";

export default function App() {
    useEffect(() => {
        const notificationListener =
            Notifications.addNotificationReceivedListener((notification) => {
                //console.log("Notification received:", notification);
            });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            enabled={true}
            behavior="height"
        >
            <View style={styles.backgroundImage}>
                <Main />
                <StatusBar style="auto" />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "bisque",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
});
