import { useAccount } from "@/hooks/use-account";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const { signIn, signOut } = useAccount();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await signIn(email, password);
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
      <Pressable onPress={signOut}>
        <Text className="text-white text-2xl underline">{"[Sign Out]"}</Text>
      </Pressable>
    </View>
  );
}
