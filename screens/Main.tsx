import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import { t } from "../translations/translator";
import Header from "../components/Header";
import Bubble from "../components/Bubble";
import FormularyModal from "../components/FormularyModal";

export default function Main() {
  const [appData, setAppData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const changeModalVisibility = (): void => setModalVisible(!isModalVisible);

  const _storeData = async (dataToStore: string[]) => {
    try {
      await AsyncStorage.setItem(
        'TinyNotesData',
        JSON.stringify(dataToStore)
      );
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  const _retrieveData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('TinyNotesData');
      if (storedData !== null) {
        setAppData(JSON.parse(storedData));
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  const addElementToToDoList = (elementToAdd: string): void => {
    appData.push(elementToAdd)
    setAppData(appData);
    _storeData(appData);
  }

  const removeElementFromToDoList = (elementToRemove: string): void => {
    Alert.alert(
      t("Confirm_delete"),
      t("Confirm_delete_element"),
      [
        {
          text: t("Cancel"),
          style: "cancel"
        },
        {
          text: t("Accept"),
          onPress: () => {
            const newAppData = appData.filter(item => item !== elementToRemove);
            setAppData(newAppData);
            _storeData(newAppData);
          }
        }
      ],
      { cancelable: false }
    )
  }

  const removeAllElementsFromToDoList = (): void => {
    Alert.alert(
      t("Confirm_delete"),
      t("Confirm_delete_all"),
      [
        {
          text: t("Cancel"),
          style: "cancel"
        },
        {
          text: t("Accept"),
          onPress: () => {
            ;
            setAppData([]);
            _storeData([]);
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        changeModalVisibility={changeModalVisibility}
        removeAllElementsFromToDoList={removeAllElementsFromToDoList}
      />
      <ScrollView style={styles.scrollViewContainer}>
        {appData.map((element, index) => (
          <Bubble
            key={index}
            isList={true}
            text={element}
            onLongPressEvent={removeElementFromToDoList}
          />
        ))}
      </ScrollView>
      <FormularyModal
        isModalVisible={isModalVisible}
        changeModalVisibility={changeModalVisibility}
        addFunction={addElementToToDoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ScreenDimensions.width,
    marginTop: "5%",
  },
  scrollViewContainer: {
    flex: 1,
  },
});
