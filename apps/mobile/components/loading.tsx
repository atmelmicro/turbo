import { ActivityIndicator } from "react-native-paper";
import { MainView } from "./Themed";

export function Loading() {
  return (
    <MainView
      style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
    >
      <ActivityIndicator />
    </MainView>
  );
}
