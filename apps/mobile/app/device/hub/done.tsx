import { MainView } from "@/components/Themed";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Done() {
  return (
    <MainView
      style={{
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text variant="headlineSmall">Your MAT Hub is connected!</Text>
        <Text>You can add Zigbee devices now.</Text>
      </View>
      <Button
        onPress={() => router.navigate("/(tabs)/settings")}
        mode="contained"
      >
        Finish
      </Button>
    </MainView>
  );
}
