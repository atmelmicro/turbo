import { MainView } from "@/components/Themed";
import { Link } from "expo-router";
import { List } from "react-native-paper";

export default function AddDevice() {
  return (
    <MainView>
      <List.Section title="What device do you want to set up?">
        <Link href="/device/hub/plugin">
          <List.Item title="MAT Hub" />
        </Link>
      </List.Section>
    </MainView>
  );
}
