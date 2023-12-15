import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import {
    Ionicons,
    SimpleLineIcons,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { PlaySound } from "../util/PlaySound";
import { t } from "../translations/translator";

interface propsOptionsBtn {
    changeModalVisibility: () => void;
    removeAllElementsFromToDoList: () => void;
}

export default function OptionsBtn(props: propsOptionsBtn) {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [isButtonsDeployed, setIsButtonsDeployed] = useState<boolean>(false);
    const interpolatedSlide = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const addElement = (): void => {
        PlaySound(require("../assets/sounds/press-in.mp3"), false);
        props.changeModalVisibility();
    };

    const removeAllElements = (): void => {
        PlaySound(require("../assets/sounds/press-in.mp3"), false);
        props.removeAllElementsFromToDoList();
    };

    const handlePressMainBtn = () => {
        setIsButtonsDeployed(!isButtonsDeployed);
        Animated.timing(slideAnim, {
            toValue: isButtonsDeployed ? 0 : 1,
            duration: 50,
            useNativeDriver: true,
        }).start();

        PlaySound(require("../assets/sounds/press-in.mp3"), false);
    };

    return (
        <View style={styles.optionsBtnContainer}>
            <Animated.View
                style={[
                    styles.optionsAnimatedView,
                    {
                        transform: [{ translateY: interpolatedSlide }],
                    },
                ]}
            >
                <View
                    style={[
                        {
                            flexDirection: "row",
                        },
                        !isButtonsDeployed && { display: "none" },
                    ]}
                >
                    <Text style={styles.optionsBtnText}>{t("Add_new")}</Text>
                    <Pressable
                        style={[
                            styles.optionsButton,
                            styles.optionsSecondaryButton,
                        ]}
                        onPress={addElement}
                    >
                        <SimpleLineIcons
                            name="note"
                            size={25}
                            color="black"
                            style={styles.optionsBtnIcon}
                        />
                    </Pressable>
                </View>
                <View
                    style={[
                        {
                            flexDirection: "row",
                        },
                        !isButtonsDeployed && { display: "none" },
                    ]}
                >
                    <Text style={styles.optionsBtnText}>{t("Delete_all")}</Text>
                    <Pressable
                        style={[
                            styles.optionsButton,
                            styles.optionsSecondaryButton,
                        ]}
                        onPress={removeAllElements}
                    >
                        <Feather
                            name="trash-2"
                            size={30}
                            color="black"
                            style={styles.optionsBtnIcon}
                        />
                    </Pressable>
                </View>
            </Animated.View>
            <Pressable
                style={styles.optionsButton}
                onPress={handlePressMainBtn}
            >
                {!isButtonsDeployed ? (
                    <Ionicons
                        name="ios-add"
                        size={45}
                        color="white"
                        style={styles.optionsBtnIcon}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="window-close"
                        size={35}
                        color="white"
                        style={styles.optionsBtnIcon}
                    />
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    optionsBtnContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        width: 300,
    },
    optionsAnimatedView: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
    },
    optionsButton: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "gold",
        elevation: 5,
        borderRadius: 50,
        padding: 5,
        margin: 5,
        width: 55,
        maxWidth: 55,
        height: 57,
        minHeight: 57,
        maxHeight: 57,
    },
    optionsSecondaryButton: {
        backgroundColor: "white",
        borderWidth: 1,
    },
    optionsBtnText: {
        alignContent: "center",
        textAlign: "right",
        width: 125,
        height: 30,
        marginTop: "7%",
        marginRight: 5,
    },
    optionsBtnIcon: {
        textAlign: "center",
    },
});
