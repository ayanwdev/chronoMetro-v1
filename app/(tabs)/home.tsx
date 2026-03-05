import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ThemedView className="p-9">
          <ThemedText className="font-mono text-center text-4xl p-3">
            {"01:23:45"}
          </ThemedText>
        </ThemedView>
        <View>
          <View className="flex flex-row justify-between bg-blue-600 p-4">
            <View>
              <ThemedText className="font-bold">{"TEST-01"}</ThemedText>
            </View>
            <View>
              <Pressable>
                <ThemedText className="underline">{"Start"}</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
