import { StyleSheet } from "react-native";
import { MainView, View } from "@/components/Themed";
import { Link } from "expo-router";
import { List, Text } from "react-native-paper";
import { trpc } from "@/utils/trpc";
import { Loading } from "@/components/loading";
import { useQueryClient } from "@tanstack/react-query";
import { deleteToken } from "@/utils/auth";
import { SafeAreaView } from "react-native-safe-area-context";

function LogoutButton() {
  const { mutate } = trpc.user.logout.useMutation({
    onSuccess: async () => {
      await deleteToken();
      client.refetchQueries();
    },
  });
  const client = useQueryClient();

  return (
    <List.Item
      title="Log out"
      onPress={async () => {
        mutate();
      }}
    />
  );
}

export default function TabTwoScreen() {
  const { error, isLoading, data } = trpc.user.me.useQuery();

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView>
      <MainView style={{ flex: 1, gap: 10 }}>
        <Text variant="headlineSmall">Settings</Text>
        <List.Section title="Account">
          {data && !error ? (
            <>
              <List.Item title={`You're logged in as ${data.username}`} />
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <List.Item title="Log in" />
              </Link>
              <Link href="/auth/signup">
                <List.Item title="Sign up" />
              </Link>
            </>
          )}
        </List.Section>

        <List.Section title="Devices">
          <Link href="/device/add">
            <List.Item title="Add device" />
          </Link>
          <List.Item title="Manage devices" />
        </List.Section>

        <List.Section title="Homes">
          <Link href="/homes/">
            <List.Item title="Manage homes" />
          </Link>
        </List.Section>
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
