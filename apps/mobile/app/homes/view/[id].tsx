import { MainView } from "@/components/Themed";
import { Loading } from "@/components/loading";
import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import { Button, Text } from "react-native-paper";

export default function HomeViewScreen() {
  const { id } = useLocalSearchParams();
  const client = useQueryClient();
  const { mutate } = trpc.home.delete.useMutation({
    onSuccess: () => {
      client.refetchQueries();
      router.navigate("/homes");
    },
  });

  if (typeof id !== "string") return <></>;
  const { data, isLoading, error } = trpc.home.get.useQuery({ homeId: id });
  if (isLoading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;

  function handlePress() {
    Alert.alert("Delete home", "Are you sure you want to delete this home?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          //@ts-expect-error fuck you typescript
          mutate({ homeId: id! });
        },
      },
    ]);
  }

  return (
    <MainView>
      <Stack.Screen options={{ title: data?.name }} />
      <Button mode="contained" buttonColor="red" onPress={handlePress}>
        Delete home
      </Button>
    </MainView>
  );
}
