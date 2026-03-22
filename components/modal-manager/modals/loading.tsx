import React, { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  text?: string;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingModal = ({
  text = "Loading...",
  modalState,
  setModalState,
}: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (modalState) {
      rotation.value = 0;

      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
      );
    } else {
      cancelAnimation(rotation);
    }

    return () => cancelAnimation(rotation);
  }, [modalState, rotation]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Modal animationType="slide" visible={modalState} transparent>
      <Pressable
        className="h-4/5 bg-[rgba(255,255,255,0.4)]"
        onPress={() => setModalState(false)}
      />

      <View className="h-1/5 bg-blue-600 p-4 flex-row items-center gap-3">
        <Animated.View
          style={spinStyle}
          className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
        />
        <Text className="text-3xl text-gray-50">{text}</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
