import { View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { t } from "../translations/translator";

interface propsHeader {
    changeModalVisibility: () => void
    removeAllElementsFromToDoList: () => void
}

export default function Header(props: propsHeader) {
    const addElement = (): void => props.changeModalVisibility();
    const removeAllElements = ():void => props.removeAllElementsFromToDoList();

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{t("Title")}</Text>
            <View style={styles.buttonContainer}>
                <Pressable onPress={removeAllElements} style={styles.button}>
                    <MaterialCommunityIcons name="delete" size={32} color="red" style={styles.icon} />
                    <Text style={styles.textButton}>{t("Delete_all")}</Text>
                </Pressable>
                <Pressable onPress={addElement} style={styles.button}>
                    <Ionicons name="add-circle" size={32} color="green" style={styles.icon} />
                    <Text style={styles.textButton}>{t("Add_new")}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "darkorange",
        marginTop: "4.5%",
        borderWidth: 1,
    },
    title: {
        flex: 2,
        fontSize: 35,
        fontWeight: "bold",
        margin: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        justifyContent: "center",
        marginHorizontal: 10,
    },
    icon: {
        textAlign: "center",
    },
    textButton: {
        fontSize: 10,
        width: 40,
        textAlign: "center",
    }
});