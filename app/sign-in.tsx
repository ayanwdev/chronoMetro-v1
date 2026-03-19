import { account } from "@/lib/appwrite/client";
import { useUserManager } from "@/lib/db/userManager";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { setUserInfo } = useUserManager();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await account.createEmailPasswordSession({ email, password });
      const user = await account.get();
      await setUserInfo({ id: user.$id, name: user.name, email: user.email });
      router.replace("/(tabs)/home");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View className="flex-1 justify-center bg-neutral-950 px-6">
      <Text className="text-white text-2xl font-semibold mb-6">
        {"Sign In"}
      </Text>
      <TextInput
        className="bg-neutral-900 text-white p-3 rounded-lg mb-3"
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        className="bg-neutral-900 text-white p-3 rounded-lg mb-4"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-lg mb-4"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center font-medium">{"Sign In"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
        <Text className="text-blue-400 text-center">{"Create an account"}</Text>
      </TouchableOpacity>
    </View>
  );
}
