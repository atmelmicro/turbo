import { MainView } from "@/components/Themed";
import { requestForegroundPermissionsAsync } from "expo-location";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNetInfo } from "@react-native-community/netinfo";

export default function Connect() {
  const { details, type } = useNetInfo({ shouldFetchWiFiSSID: true });
  useEffect(() => {
    async function getSSID() {
      const { granted } = await requestForegroundPermissionsAsync();

      if (!granted) alert("fuck you");
    }
    getSSID();
  }, []);

  function handlePress() {
    if (type !== "wifi") {
      alert("You need to be connected to wifi to continue");
      return;
    }
    if (!details.ssid?.startsWith("MAT Hub - ")) {
      Alert.alert(
        "Invalid SSID",
        details.ssid
          ? "The SSID you're connected to is not a MAT Hub. Do you want to continue?"
          : "Your ssid cannot be read. Are you sure you are connected to the MAT Hub?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue",
            style: "destructive",
            onPress: () => router.navigate("/device/hub/wifi"),
          },
        ]
      );
      return;
    }

    router.navigate("/device/hub/wifi");
  }

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
        <Text variant="headlineSmall">Connect to the MAT Hub wifi network</Text>
        <Text>
          Go to your phone's settings and connect to the MAT Hub's wifi network.
          It will be named "MAT Hub - XXXXX"
        </Text>
        <Text>
          Current SSID:{" "}
          {type === "wifi" ? details?.ssid : "You're not connected to wifi"}
        </Text>
      </View>
      <Button mode="contained" onPress={() => handlePress()}>
        Next
      </Button>
    </MainView>
  );
}
