import { MainView } from "@/components/Themed";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";
import { trpc } from "@/utils/trpc";
import { setToken } from "@/utils/auth";
import { useQueryClient } from "@tanstack/react-query";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const client = useQueryClient();
  const { mutate, isPending } = trpc.user.login.useMutation({
    onSuccess: (data) => {
      setToken(data.sessionId);
      client.refetchQueries();
      router.navigate("/(tabs)/settings");
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit = (data: LoginForm) => mutate(data);

  return (
    <MainView
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Text variant="bodyLarge">Log into your MAT Development account</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            mode="outlined"
          />
        )}
        name="email"
      />
      {errors.email && <Text>an email for fucks sake</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            mode="outlined"
          />
        )}
        name="password"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          disabled={isPending}
          loading={isPending}
        >
          Log in
        </Button>
        <Button onPress={() => router.navigate("/auth/signup")}>
          Create an account
        </Button>
      </View>
    </MainView>
  );
}
