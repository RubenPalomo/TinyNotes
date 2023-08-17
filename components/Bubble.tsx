import { useRef, useState } from "react";
import { StyleSheet, Pressable, Animated } from "react-native";

interface BubbleProps {
    text: string;
    isTitle: boolean;
    onPressEvent?: () => void;
    onLongPressEvent?: (elementToRemove: string) => void;
}

export default function Bubble(props: BubbleProps): React.JSX.Element {
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const shadowOpacity = useRef(new Animated.Value(0)).current;
    const [backgroundColor, setBackgroundColor] = useState("darkmagenta");
    let padding: number;
    let fontSize: number;
    let textAlign: 'center' | 'left';
    if (props.isTitle) {
        padding = 15,
            fontSize = 20,
            textAlign = 'center'
    }
    else {
        padding = 10,
            fontSize = 15,
            textAlign = 'left'
    }

    const backgroundColorStyle = {
        backgroundColor: backgroundColor,
    };

    const textOpacityStyle = {
        opacity: shadowOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.7],
        }),
    };

    const handlePressIn = (): void => {
        setIsEnabled(false);
        Animated.timing(shadowOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setBackgroundColor("purple");
    };

    const handlePressOut = (): void => {
        setIsEnabled(true);
        Animated.timing(shadowOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setBackgroundColor("darkmagenta");
    };

    const handleFunction = (textBubble: string): void => {
        if (props.onLongPressEvent)
            props.onLongPressEvent(textBubble);
    }

    return (
        <Pressable
            style={[styles.bubbleContainer, backgroundColorStyle, { padding: padding }]}
            onPress={props.onPressEvent}
            onLongPress={() => handleFunction(props.text)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={!isEnabled}>
            <Animated.Text style={[
                styles.BubbleBtnTxt,
                textOpacityStyle,
                { fontSize: fontSize, textAlign: textAlign },
            ]}>
                {props.text}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    bubbleContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        width: "90%",
    },
    BubbleBtnTxt: {
        color: "white",
    },
});
