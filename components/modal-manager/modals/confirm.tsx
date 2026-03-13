import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  text?: string;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  confirmAction: () => void;
};

const ConfirmModal = ({
  text = "Confirm action[s]?",
  modalState,
  setModalState,
  confirmAction = () => {},
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
      <View className="h-1/5 bg-gray-900 p-4">
        <View>
          <Text className="text-3xl text-red-500">{text}</Text>
        </View>
        <View>
          <View className="flex-row justify-end gap-4 mt-4">
            <Pressable
              className="px-4 py-2 bg-gray-700 rounded"
              onPress={() => setModalState(false)}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 bg-red-600 rounded"
              onPress={() => {
                confirmAction();
                setModalState(false);
              }}
            >
              <Text className="text-white font-bold">Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
