import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import { t } from "../translations/translator";
import Header from "../components/Header";
import AddTinyNoteModal from "../components/AddTinyNoteModal";
import EditTinyNoteModal from "../components/EditTinyNoteModal";
import OptionsBtn from "../components/OptionsBtn";
import TinyNoteComponent from "../components/TinyNoteComponent";
import {
    schedulePushNotification,
    cancelScheduledNotification,
} from "../util/PushNotificationsManager";

interface storedDataObject {
    text: string;
    idNotification: string;
}

export default function Main() {
    const [appData, setAppData] = useState<storedDataObject[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [isEditModalVisible, setIsEditModalVisible] =
        useState<boolean>(false);
    const [editModalId, setEditModalId] = useState<number | undefined>();
    const [editModalText, setEditModalText] = useState<string>("");
    const [openNoteId, setOpenNoteId] = useState<number | null>(null);

    const _storeData = async (
        dataToStore: storedDataObject[]
    ): Promise<void> => {
        try {
            await AsyncStorage.setItem(
                "TinyNotesData",
                JSON.stringify(dataToStore)
            );
        } catch (error) {
            Alert.alert("Error", error);
        }
    };

    const _retrieveData = async (): Promise<void> => {
        try {
            const storedData = await AsyncStorage.getItem("TinyNotesData");
            if (storedData !== null) {
                setAppData(JSON.parse(storedData));
            }
        } catch (error) {
            Alert.alert("Error", error);
        }
    };

    const addElementToToDoList = async (
        elementToAdd: string
    ): Promise<void> => {
        const idNotification = await schedulePushNotification(
            t("Something_to_do"),
            elementToAdd,
            86400
        );
        const newObject: storedDataObject = {
            text: elementToAdd,
            idNotification: idNotification,
        };

        const updatedAppData = [...appData, newObject];

        setAppData(updatedAppData);
        _storeData(updatedAppData);
    };

    const editElementFromToDoList = async (
        id: number,
        elementToEdit: string
    ): Promise<void> => {
        const idNotification = await schedulePushNotification(
            t("Something_to_do"),
            elementToEdit,
            86400
        );
        const editedObject: storedDataObject = {
            text: elementToEdit,
            idNotification: idNotification,
        };

        const updatedAppData = [...appData];
        updatedAppData[id] = editedObject;

        setAppData(updatedAppData);
        _storeData(updatedAppData);
    };

    const removeElementFromToDoList = (elementToRemove: string): void => {
        Alert.alert(
            t("Confirm_delete"),
            t("Confirm_delete_element"),
            [
                {
                    text: t("Cancel"),
                    style: "cancel",
                },
                {
                    text: t("Accept"),
                    onPress: () => {
                        const notificationToRemove = appData.find(
                            (item) => item.text === elementToRemove
                        ).idNotification;
                        const newAppData = appData.filter(
                            (item) => item.text !== elementToRemove
                        );

                        setAppData(newAppData);
                        _storeData(newAppData);
                        cancelScheduledNotification(notificationToRemove);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const openEditModal = async (id: number, text: string): Promise<void> => {
        setEditModalId(id);
        setEditModalText(text);
        setIsEditModalVisible(!isEditModalVisible);
    };

    const removeAllElementsFromToDoList = (): void => {
        Alert.alert(
            t("Confirm_delete"),
            t("Confirm_delete_all"),
            [
                {
                    text: t("Cancel"),
                    style: "cancel",
                },
                {
                    text: t("Accept"),
                    onPress: () => {
                        appData.forEach((element) => {
                            cancelScheduledNotification(element.idNotification);
                        });
                        setAppData([]);
                        _storeData([]);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        _retrieveData();
    }, []);

    useEffect(() => {
        _retrieveData();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollViewContainer}>
                {appData.map((element, index) => (
                    <TinyNoteComponent
                        key={index}
                        id={index}
                        text={element.text}
                        changeOpenNoteId={setOpenNoteId}
                        areOptionsOpen={openNoteId === index}
                        editElementFromToDoList={() =>
                            openEditModal(index, element.text)
                        }
                        removeElementFromToDoList={removeElementFromToDoList}
                    />
                ))}
            </ScrollView>
            <AddTinyNoteModal
                isModalVisible={isAddModalVisible}
                changeModalVisibility={() => {
                    setIsAddModalVisible(!isAddModalVisible);
                }}
                addFunction={addElementToToDoList}
            />
            <EditTinyNoteModal
                id={editModalId}
                isModalVisible={isEditModalVisible}
                noteToEdit={editModalText}
                closeModal={() => setIsEditModalVisible(false)}
                editFunction={editElementFromToDoList}
            />
            <View style={styles.optionsButtonContainer}>
                <OptionsBtn
                    changeModalVisibility={() => {
                        setIsAddModalVisible(!isAddModalVisible);
                    }}
                    removeAllElementsFromToDoList={
                        removeAllElementsFromToDoList
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: ScreenDimensions.width,
        marginTop: "5%",
    },
    scrollViewContainer: {
        flex: 1,
    },
    optionsButtonContainer: {
        position: "absolute",
        right: 20,
        bottom: 50,
    },
});
