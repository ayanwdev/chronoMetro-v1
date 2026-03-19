import ModalRenderer from "@/components/modal-manager/modal-renderer";
import migrations from "@/drizzle/migrations";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { account } from "@/lib/appwrite/client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack, router, useRootNavigationState } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import "./global.css";

function AuthGate() {
  const rootNav = useRootNavigationState();

  useEffect(() => {
    if (!rootNav?.key) return;
    account
      .get()
      .then(() => router.replace("/(tabs)/home"))
      .catch(() => router.replace("/"));
  }, [rootNav]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Suspense
      fallback={
        <View className="flex-1 bg-neutral-950">
          <ActivityIndicator />
        </View>
      }
    >
      <SQLiteProvider
        databaseName="app.db"
        onInit={async (database) => {
          await migrate(drizzle(database), migrations);
        }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthGate />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
          </Stack>
          <StatusBar style="auto" />
          <ModalRenderer />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
