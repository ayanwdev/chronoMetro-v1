import WideButton from "@/components/wide-button";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="flex">
          <View className="flex h-4/5 bg-gray-900 w-screen"></View>
          <View className="flex justify-end h-1/5 w-screen">
            <WideButton
              text="Sign Up"
              action={() => router.replace("/sign-up")}
              className="bg-sky-800"
            />
            <WideButton
              text="Sign In"
              action={() => router.replace("/sign-in")}
              className="bg-sky-500"
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
