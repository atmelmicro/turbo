import { MainView } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { router } from "expo-router";

type WifiForm = {
  network: string;
  password: string;
};

export default function Wifi() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WifiForm>();
  const onSubmit = (data: WifiForm) => {
    console.log(data);
    router.navigate("/device/hub/token");
  };

  return (
    <MainView
      style={{
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
        <Text variant="bodyLarge">
          Connect to the MAT Hub's wifi network. The MAT Hub only supports
          2.4GHz networks.
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Network name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
            />
          )}
          name="network"
        />
        {errors.network && <Text>A valid SSID is required</Text>}

        <Controller
          control={control}
          rules={{
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
        {errors.password && <Text>A valid password is required</Text>}
      </View>
      <Button onPress={handleSubmit(onSubmit)} mode="contained">
        Next
      </Button>
    </MainView>
  );
}
