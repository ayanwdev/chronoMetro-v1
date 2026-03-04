import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { account } from "@/lib/appwrite";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const rootNav = useRootNavigationState();

  // 1️⃣ Check auth (no routing here)
  useEffect(() => {
    async function checkAuth() {
      try {
        await account.get();
        router.replace("/(tabs)/home");
      } catch {
        router.replace("/");
      } finally {
        setCheckedAuth(true);
      }
    }

    if (rootNav?.key) {
      checkAuth();
    }
  }, [rootNav]);

  // 2️⃣ Hide splash AFTER navigation tree exists
  useEffect(() => {
    if (checkedAuth && rootNav?.key) {
      SplashScreen.hideAsync();
    }
  }, [checkedAuth, rootNav]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="(tabs)/home" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
