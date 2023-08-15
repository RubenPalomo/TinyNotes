import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ScreenDimensions } from "../constants/ScreenDimensions";
import Bubble from "../components/Bubble";
import FormularyModal from "../components/FormularyModal";

export default function Main(): React.JSX.Element {
  const [toDoList, setToDoList] = useState(["Item 1", "Item 2", "Item 3"]);
  const [isModalVisible, setModalVisible] = useState(false);

  const addElementToToDoList = (elementToAdd: string): void => {
    toDoList.push(elementToAdd)
    setToDoList(toDoList);
  }

  const removeElementFromToDoList = (elementToRemove: string): void => {
    setToDoList(toDoList.filter(item => item !== elementToRemove));
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Bubble
          isTitle={true}
          text={"New element"}
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
        saveFunction={addElementToToDoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ScreenDimensions.width,
  },
  scrollViewContainer: {
    flex: 1,
  }
});
