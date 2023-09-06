import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	ImageBackground,
	KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Main from "./screens/Main";

export default function App() {
	useEffect(() => {
		const notificationListener = Notifications.addNotificationReceivedListener(
			(notification) => {
				//console.log("Notification received:", notification);
			}
		);

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
			<LinearGradient colors={["#FFAE00", "#FDFF7D"]} style={styles.container}>
				<ImageBackground
					source={require("./assets/background.png")}
					resizeMode="repeat"
					style={styles.backgroundImage}
					imageStyle={{ opacity: 0.1 }}
				>
					<Main />
					<StatusBar style="auto" />
				</ImageBackground>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
	},
});
