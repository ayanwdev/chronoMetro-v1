import { TextInput } from "react-native";

export default function WideTextArea({
  placeholder,
  placeholderTextColor = "#9CA3AF",
  secureTextEntry = false,
  className,
}: {
  placeholder: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  className?: string;
}) {
  return (
    <TextInput
      className={`w-4/5 h-12 bg-gray-800 rounded-lg p-4 text-white ${className || ""}`}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
    />
  );
}
