import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import Bubble from "../components/Bubble";
import FormularyModal from "../components/FormularyModal";
import { t } from "../translations/translator";

export default function Main(props: { toDoList: string[], saveFunction: () => void }): React.JSX.Element {
  const [toDoList, setToDoList] = useState(props.toDoList);
  const [isModalVisible, setModalVisible] = useState(false);

  const addElementToToDoList = (elementToAdd: string): void => {
    toDoList.push(elementToAdd)
    setToDoList(toDoList);
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
            setToDoList(toDoList.filter(item => item !== elementToRemove));
          }
        }
      ],
      { cancelable: false }
    )
  }

  useEffect(() => {
    props.saveFunction();
  }, [toDoList]);

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
        {toDoList.map((element, index) => (
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
