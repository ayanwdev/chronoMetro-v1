import { Pressable, Text, View } from "react-native";

interface Props {
  text: string;
  action: () => void;
  className?: string;
}

export default function WideButton({ text, action, className }: Props) {
  return (
    <Pressable
      className={`flex mx-5 my-2 rounded-lg justify-center items-center ${className || ""}`}
      onPress={action}
    >
      <View className="flex p-3">
        <Text className="text-2xl text-white text-center">{text}</Text>
      </View>
    </Pressable>
  );
}
