import { account } from "@/lib/appwrite/client";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ID } from "react-native-appwrite";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignUp() {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    router.replace("/");
  }

  return (
    <View className="flex-1 justify-center bg-neutral-950 px-6">
      <Text className="text-white text-2xl font-semibold mb-6">
        {"Sign Up"}
      </Text>

      <TextInput
        className="bg-neutral-900 text-white p-3 rounded-lg mb-3"
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

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
        className="bg-green-600 p-3 rounded-lg mb-4"
        onPress={handleSignUp}
      >
        <Text className="text-white text-center font-medium">
          {"Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/sign-in")}>
        <Text className="text-blue-400 text-center">
          {"Already have an account?"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
