import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon(props: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) {
  return (
    <Ionicons
      name={props.name}
      size={23}
      color={props.focused ? "#2B7FFF" : "#fff"}
    />
  );
}
