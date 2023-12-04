import { StyleSheet, Pressable, Text, View } from "react-native";
import { PlaySound } from "./PlaySound";

interface BubbleProps {
    text: string;
    isList: boolean;
    onPressEvent?: () => void;
    onLongPressEvent?: (elementToRemove: string) => void;
}

export default function Bubble(props: BubbleProps) {
    let padding: number;
    let fontSize: number;
    let textAlign: "center" | "left";
    if (!props.isList) {
        padding = 15;
        fontSize = 20;
        textAlign = "center";
    } else {
        padding = 10;
        fontSize = 20;
        textAlign = "left";
    }

    const playClickSound = (): void => {
        PlaySound(require("../assets/sounds/press-in.mp3"), false);
    };

    const handleFunction = (textBubble: string): void => {
        if (props.onLongPressEvent) props.onLongPressEvent(textBubble);
    };

    return (
        <View style={styles.bubbleOuterContainer}>
            <Pressable
                style={[styles.bubbleInnerContainer, { padding: padding }]}
                onPress={props.onPressEvent}
                onLongPress={() => handleFunction(props.text)}
                onPressIn={playClickSound}
                android_ripple={{
                    color: "indigo",
                }}
            >
                <Text style={[{ fontSize: fontSize, textAlign: textAlign }]}>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bubbleOuterContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        width: "90%",
        overflow: "hidden",
        backgroundColor: "gold",
        borderRadius: 20,
    },
    bubbleInnerContainer: {
        width: "100%",
        elevation: 8,
    },
});
