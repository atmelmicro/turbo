import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/components/useColorScheme";
import { Appbar, PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { getToken } from "@/utils/auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://10.0.2.2:8787/trpc",
          async headers() {
            return {
              authorization: `Bearer ${getToken()}`,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Stack
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ title: "Log in" }} />
            <Stack.Screen
              name="auth/signup"
              options={{ title: "Create an account" }}
            />
            <Stack.Screen name="homes/index" options={{ title: "Homes" }} />
            <Stack.Screen
              name="homes/create"
              options={{ title: "Create home" }}
            />
            <Stack.Screen name="device/add" options={{ title: "Add device" }} />
          </Stack>
        </PaperProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} size={20} />
      ) : null}
      <Appbar.Content title={options.title ?? "No title."} />
    </Appbar.Header>
  );
}
