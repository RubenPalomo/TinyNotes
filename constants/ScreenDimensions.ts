import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const ScreenDimensions = {
    width: width,
    height: height,
};
