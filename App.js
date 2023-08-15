import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenDimensions } from "./constants/ScreenDimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Main from "./screens/Main";

export default function App() {
  const [data, setData] = useState([]);

  const saveData = async (newData) => {
    const dataToSave = [...dataToSave, newData];
    await AsyncStorage.setItem("TinyNotesData", JSON.stringify(dataToSave));
    setData(dataToSave);
  };

  const loadData = async () => {
    const savedData = await AsyncStorage.getItem("TinyNotesData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  };

  useEffect(() => {
    saveData();
  }, [data]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={true}
    >
      <LinearGradient
        colors={["#FFAE00", "#FDFF7D"]}
        style={styles.container}
      >
        <ImageBackground
          source={require("./assets/background.png")}
          resizeMode="repeat"
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.1 }}
        >
          <Main toDoList={data} />
          <StatusBar style="auto" />
        </ImageBackground>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: ScreenDimensions.width,
    height: ScreenDimensions.height,
  },
});
