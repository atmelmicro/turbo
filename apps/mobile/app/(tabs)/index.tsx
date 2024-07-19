import { StyleSheet } from "react-native";
import { MainView, View } from "@/components/Themed";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";

export default function TabOneScreen() {
  return (
    <SafeAreaView>
      <MainView style={{ gap: 10 }}>
        <Text variant="headlineSmall">Home</Text>
        <Card mode="contained" style={{}}>
          <View
            style={{
              backgroundColor: "transparent",
              gap: 10,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text variant="titleMedium">MAT Blind 1</Text>

              <View
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <IconButton
                  icon="arrow-up"
                  size={20}
                  mode="outlined"
                  onPress={() => {}}
                />

                <IconButton
                  icon="arrow-down"
                  size={20}
                  mode="outlined"
                  onPress={() => {}}
                />
              </View>
            </View>
            <Slider
              thumbTintColor="purple"
              maximumTrackTintColor="purple"
              minimumTrackTintColor="purple"
              style={{ marginLeft: 10, marginRight: 10 }}
            />
          </View>
        </Card>
      </MainView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
