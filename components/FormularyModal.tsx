import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, Modal, TextInput, StyleSheet } from "react-native";
import Bubble from "./Bubble";
import { t } from "../translations/translator"

interface FormularyModalProps {
    isModalVisible: boolean,
    changeModalVisibility: () => void,
    addFunction: (elementToAdd: string) => void
}

export default function FormularyModal(props: FormularyModalProps) {
    const [textInputValue, setTextInputValue] = useState("");

    const handleSave = () => {
        if (textInputValue !== "") {
            props.changeModalVisibility();
            props.addFunction(textInputValue)
            setTextInputValue("");
        }
    };

    const handleCancel = () => {
        props.changeModalVisibility();
        setTextInputValue("");
    };

    return (
        <Modal
            visible={props.isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.instructions}>{t("New_element")}:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={textInputValue}
                        onChangeText={(text) => setTextInputValue(text)}
                        onSubmitEditing={handleSave}
                        autoFocus={true}
                    />
                    <Bubble text={t("Save")} isList={false} onPressEvent={handleSave} />
                    <Bubble text={t("Cancel")} isList={false} onPressEvent={handleCancel} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        width: "90%",
    },
    textInput: {
        width: "90%",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 20,
    },
    modalButton: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        margin: 2,
        padding: 5,
        width: "50%",
        backgroundColor: "darkmagenta",
    },
    textButton: {
        color: "white",
        textAlign: "center",
    },
    instructions: {
        fontSize: 20,
        textAlign: "left",
        width: "100%",
    }
});
