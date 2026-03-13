import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

type Props = {
  text?: string;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoModal = ({ text = "Info: ", modalState, setModalState }: Props) => {
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!modalState) return;

    progress.setValue(1);

    Animated.timing(progress, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setModalState(false);
    });
  }, [modalState]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Modal animationType="slide" visible={modalState} transparent>
      <Pressable
        className="h-5/6 bg-[rgba(255,255,255,0.4)]"
        onPress={() => setModalState(false)}
      />

      <View className="h-1/6 bg-blue-500 p-4 overflow-hidden">
        {/* progress bar */}
        <Animated.View
          style={{ width }}
          className="absolute top-0 right-0 h-1 bg-white"
        />

        <Text className="text-3xl text-gray-50">{text}</Text>
      </View>
    </Modal>
  );
};

export default InfoModal;
