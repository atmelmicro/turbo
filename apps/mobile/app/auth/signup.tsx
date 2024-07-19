import { MainView } from "@/components/Themed";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";
import { trpc } from "@/utils/trpc";
import { setToken } from "@/utils/auth";
import { useQueryClient } from "@tanstack/react-query";

type SignupForm = {
  email: string;
  password: string;
  username: string;
};

export default function SignupScreen() {
  const client = useQueryClient();
  const { mutate, isPending } = trpc.user.createUser.useMutation({
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
  } = useForm<SignupForm>();
  const onSubmit = (data: SignupForm) => mutate(data);

  return (
    <MainView
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Text variant="bodyLarge">Create your MAT Development account</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
          />
        )}
        name="username"
      />
      {errors.email && <Text>Username is required</Text>}
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
      {errors.email && <Text>A valid email is required</Text>}

      <Controller
        control={control}
        rules={{
          minLength: 8,
          required: true,
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
      {errors.password && (
        <Text>Your password has to be 8 characters or longer</Text>
      )}

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
          Create an account
        </Button>
        <Button onPress={() => router.navigate("/auth/login")}>Log in</Button>
      </View>
    </MainView>
  );
}
