import React, { useState } from "react";
import { Pressable, StyleSheet, Text, Alert, Linking } from "react-native";
import { t } from "../translations/translator";
import { PlaySound } from "../util/PlaySound";

export default function Header() {
    const [taps, setTaps] = useState<number>(0);

    const easterEgg = (): void => {
        setTaps(taps + 1);

        if (taps > 3) {
            showCredits();
            setTaps(0);
        }
    };

    const showCredits = (): void => {
        PlaySound(require("../assets/sounds/appear.mp3"), false);

        Alert.alert(
            t("Credits"),
            "Software developer:\n\tRubén Palomo Fontán\n\nDesigner:\n\tStiven Reyes",
            [
                {
                    text: "LinkedIn Developer",
                    onPress: () =>
                        Linking.openURL(
                            "https://www.linkedin.com/in/ruben-palomo-fontan/"
                        ),
                },
                {
                    text: "LinkedIn Designer\t",
                    onPress: () =>
                        Linking.openURL(
                            "https://www.linkedin.com/in/stiven-reyes-design-2063b527a/"
                        ),
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <Pressable style={styles.header} onPress={easterEgg}>
            <Text style={styles.title}>{t("Title")}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "bisque",
        marginTop: "4.5%",
        marginBottom: "5%",
        marginLeft: "10%",
        borderBottomWidth: 2,
        width: "80%",
        maxHeight: "12%",
    },
    title: {
        flex: 1,
        fontSize: 35,
        marginVertical: 20,
        textAlign: "center",
    },
});
