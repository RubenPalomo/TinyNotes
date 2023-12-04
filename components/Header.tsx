import { View, StyleSheet, Text, Image } from "react-native";
import { t } from "../translations/translator";

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{t("Title")}</Text>
            <Image source={require("../assets/icon.png")} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
        backgroundColor: "bisque",
        marginTop: "4.5%",
        marginBottom: 5,
        marginLeft: "10%",
        borderBottomWidth: 2,
        width: "80%",
    },
    title: {
        flex: 1,
        fontSize: 35,
        margin: 20,
        marginRight: "20%",
        textAlign: "center",
    },
    icon: {
        position: "absolute",
        top: 5,
        right: -10,
        width: 100,
        height: 100,
    },
});
