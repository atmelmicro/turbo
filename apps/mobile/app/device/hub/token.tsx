import { MainView } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { router } from "expo-router";

type IpForm = {
  ip: string;
};

export default function Token() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IpForm>();
  const onSubmit = (data: IpForm) => {
    console.log(data);
    router.navigate("/device/hub/done");
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
          TODO - mdns lookup, for now enter the ip address of the hub
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="IP address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              mode="outlined"
            />
          )}
          name="ip"
        />
        {errors.ip && <Text>A valid IP is required</Text>}
      </View>
      <Button onPress={handleSubmit(onSubmit)} mode="contained">
        Next
      </Button>
    </MainView>
  );
}
