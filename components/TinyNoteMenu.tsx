import { View, Pressable, Text, StyleSheet } from "react-native";
import { PlayClickSound } from "../util/PlaySound";

interface TinyNoteMenuProps {
    isShowed: boolean;
    editNote: () => void;
    deleteNote: () => void;
}

export default function TinyNoteMenu(props: TinyNoteMenuProps) {
    return (
        <View
            style={[
                styles.TinyNoteMenuContainer,
                !props.isShowed && { display: "none" },
            ]}
        >
            <View style={styles.TinyNoteMenuButton}>
                <Pressable
                    onPressIn={PlayClickSound}
                    onPress={props.editNote}
                    android_ripple={{ color: "lightgray" }}
                >
                    <Text style={styles.TinyNoteMenuText}>Editar</Text>
                </Pressable>
            </View>
            <View style={styles.TinyNoteMenuButton}>
                <Pressable
                    onPressIn={PlayClickSound}
                    onPress={props.deleteNote}
                    android_ripple={{ color: "lightgray" }}
                >
                    <Text style={styles.TinyNoteMenuText}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TinyNoteMenuContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "black",
        width: "50%",
        borderRadius: 10,
        marginTop: -10,
        marginLeft: "42%",
    },
    TinyNoteMenuButton: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "white",
        overflow: "hidden",
    },
    TinyNoteMenuText: {
        marginHorizontal: 10,
        color: "white",
    },
});
