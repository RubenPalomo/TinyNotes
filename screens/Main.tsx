import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import { t } from "../translations/translator";
import Header from "../components/Header";
import Bubble from "../components/Bubble";
import FormularyModal from "../components/FormularyModal";
import OptionsBtn from "../components/OptionsBtn";
import {
    schedulePushNotification,
    cancelScheduledNotification,
} from "../components/PushNotificationsManager";

interface storedDataObject {
    text: string;
    idNotification: string;
}

export default function Main() {
    const [appData, setAppData] = useState<storedDataObject[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const changeModalVisibility = (): void => setModalVisible(!isModalVisible);

    const _storeData = async (dataToStore: storedDataObject[]) => {
        try {
            await AsyncStorage.setItem(
                "TinyNotesData",
                JSON.stringify(dataToStore)
            );
        } catch (error) {
            Alert.alert("Error", error);
        }
    };

    const _retrieveData = async () => {
        try {
            const storedData = await AsyncStorage.getItem("TinyNotesData");
            if (storedData !== null) {
                setAppData(JSON.parse(storedData));
            }
        } catch (error) {
            Alert.alert("Error", error);
        }
    };

    const addElementToToDoList = async (elementToAdd: string) => {
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

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollViewContainer}>
                {appData.map((element, index) => (
                    <Bubble
                        key={index}
                        isList={true}
                        text={element.text}
                        onLongPressEvent={removeElementFromToDoList}
                    />
                ))}
            </ScrollView>
            <FormularyModal
                isModalVisible={isModalVisible}
                changeModalVisibility={changeModalVisibility}
                addFunction={addElementToToDoList}
            />
            <View style={styles.optionsButtonContainer}>
                <OptionsBtn
                    changeModalVisibility={changeModalVisibility}
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
