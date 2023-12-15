import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { PlayClickSound } from "../util/PlaySound";
import Bubble from "./Bubble";
import TinyNoteMenu from "./TinyNoteMenu";

interface TinyNoteComponentProps {
    id: number;
    text: string;
    changeOpenNoteId: Dispatch<SetStateAction<number>>;
    areOptionsOpen: boolean;
    editElementFromToDoList: (elementToRemove: string) => void;
    removeElementFromToDoList: (elementToRemove: string) => void;
}

export default function TinyNoteComponent(props: TinyNoteComponentProps) {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const openOptions = (): void => {
        props.changeOpenNoteId(props.id);
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        if (!props.areOptionsOpen) setShowOptions(false);
    }, [props.areOptionsOpen]);

    return (
        <View style={styles.tinyNoteComponentContainer}>
            <Bubble text={props.text} isList={true} backgroundColor="#F7EECC" />
            <Pressable
                style={styles.optionsIcon}
                onPressIn={PlayClickSound}
                onPress={openOptions}
            >
                <SimpleLineIcons
                    name="options-vertical"
                    size={25}
                    color="black"
                />
            </Pressable>
            <TinyNoteMenu
                isShowed={showOptions}
                editNote={() => props.editElementFromToDoList(props.text)}
                deleteNote={() => props.removeElementFromToDoList(props.text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tinyNoteComponentContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    optionsIcon: {
        position: "absolute",
        top: 20,
        right: "8%",
    },
});
