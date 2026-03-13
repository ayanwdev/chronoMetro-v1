import { useModalManager } from "@/lib/modalManager";
import React from "react";
import { Pressable, Text } from "react-native";

const ModalTester = () => {
  const modal = useModalManager();
  return (
    <>
      <Pressable
        onPress={() => {
          modal.show("success");
        }}
        className="bg-green-600"
      >
        <Text className="underline text-center text-white">
          {"Show success modal"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("confirm");
        }}
        className="bg-yellow-600"
      >
        <Text className="underline text-center text-white">
          {"Show confirm modal"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("info");
        }}
        className="bg-blue-600"
      >
        <Text className="underline text-center text-white">
          {"Show info modal"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("error");
        }}
        className="bg-red-600"
      >
        <Text className="underline text-center text-white">
          {"Show error modal"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          modal.show("loading");
        }}
        className="bg-blue-600"
      >
        <Text className="underline text-center text-white">
          {"Show loading modal"}
        </Text>
      </Pressable>
    </>
  );
};

export default ModalTester;
