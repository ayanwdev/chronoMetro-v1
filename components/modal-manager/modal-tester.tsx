import { useModalManager } from "@/lib/modalManager";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ModalTester = () => {
  const modal = useModalManager();
  return (
    <View className="w-full px-10 flex-row justify-center flex-wrap gap-2">
      <Pressable
        onPress={() => {
          modal.show("success");
        }}
        className="bg-green-600"
      >
        <Text className="underline text-center text-white">{"Success"}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("confirm");
        }}
        className="bg-yellow-600"
      >
        <Text className="underline text-center text-white">{"Confirm"}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("info");
        }}
        className="bg-blue-600"
      >
        <Text className="underline text-center text-white">{"Info"}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("error");
        }}
        className="bg-red-600"
      >
        <Text className="underline text-center text-white">{"Error"}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("loading");
        }}
        className="bg-blue-600"
      >
        <Text className="underline text-center text-white">{"Loading"}</Text>
      </Pressable>
    </View>
  );
};

export default ModalTester;
