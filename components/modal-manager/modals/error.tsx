import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  text?: string;
  closeText?: string;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ErrorModal = ({
  text = "Error!",
  closeText = "CLOSE",
  modalState,
  setModalState,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      visible={modalState}
      transparent
      allowSwipeDismissal
    >
      <Pressable
        className="h-4/5 bg-[rgba(255,255,255,0.4)]"
        onPress={() => {
          setModalState(false);
        }}
      ></Pressable>
      <View className="h-1/5 bg-red-600 p-4">
        <View>
          <Text className="text-3xl text-gray-50">{text}</Text>
        </View>
        <View>
          <View className="flex-row justify-end gap-4 mt-4">
            <Pressable
              className="px-4 py-2 bg-red-600 rounded"
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text className="text-gray-50 font-bold">{closeText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
