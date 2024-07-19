import { MainView } from "@/components/Themed";
import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Text, Button } from "react-native-paper";

type NewHomeForm = {
  name: string;
};

export default function CreateHomeScreen() {
  const client = useQueryClient();
  const { mutate, isPending, error } = trpc.home.create.useMutation({
    onSuccess: (data) => {
      client.refetchQueries();
      router.navigate("/homes");
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewHomeForm>();
  const onSubmit = (data: NewHomeForm) => mutate(data);

  return (
    <MainView
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
          />
        )}
        name="name"
      />
      {errors.name && <Text>Invalid name</Text>}
      <Button
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        loading={isPending}
      >
        Create home
      </Button>
      {error && <Text>{error.message}</Text>}
    </MainView>
  );
}
