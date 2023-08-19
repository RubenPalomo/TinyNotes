import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import Bubble from "../components/Bubble";
import FormularyModal from "../components/FormularyModal";
import { t } from "../translations/translator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main(): React.JSX.Element {
  const [appData, setAppData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const _storeData = async (dataToStore) => {
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

  useEffect(() => {
    _retrieveData();
  }, []);

  const addElementToToDoList = (elementToAdd: string): void => {
    appData.push(elementToAdd)
    setAppData(appData);
    _storeData(appData);
  }

  const removeElementFromToDoList = (elementToRemove: string): void => {
    Alert.alert(
      t("Confirm_delete"),
      t("Are_you_sure"),
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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Bubble
          isTitle={true}
          text={t("Add_element")}
          onPressEvent={() => setModalVisible(!isModalVisible)}
        />
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {appData.map((element, index) => (
          <Bubble
            key={index}
            isTitle={false}
            text={element}
            onLongPressEvent={removeElementFromToDoList}
          />
        ))}
      </ScrollView>
      <FormularyModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
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
