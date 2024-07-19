import { MainView } from "@/components/Themed";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Plugin() {
  return (
    <MainView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text variant="headlineSmall">Plug in your MAT Hub</Text>
        <Text>
          Plug your MAT Hub into a power outlet and wait until the light is
          solid blue.
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={() => router.navigate("/device/hub/connect")}
      >
        Next
      </Button>
    </MainView>
  );
}
