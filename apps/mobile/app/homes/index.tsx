import { MainView } from "@/components/Themed";
import { Loading } from "@/components/loading";
import { trpc } from "@/utils/trpc";
import { Link, router } from "expo-router";
import { Button, List, Text } from "react-native-paper";

export default function HomeScreen() {
  const { data, error, isLoading } = trpc.home.getAll.useQuery();
  if (isLoading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;
  return (
    <MainView>
      <List.Section title="Homes">
        {data?.map((home) => (
          <Link href={`/homes/view/${home.id}`} key={home.id}>
            <List.Item title={home.name} />
          </Link>
        ))}
        {data?.length === 0 && <List.Item title="No homes found" />}
      </List.Section>
      <Button mode="outlined" onPress={() => router.navigate("/homes/create")}>
        Create home
      </Button>
    </MainView>
  );
}
