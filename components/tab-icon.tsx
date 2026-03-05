import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon(props: {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  focused: boolean;
}) {
  return (
    <Ionicons
      name={props.name}
      size={props.size || 23}
      color={props.color || (props.focused ? "#2B7FFF" : "#fff")}
    />
  );
}
