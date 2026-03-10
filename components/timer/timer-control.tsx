import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  active: boolean;
};

export default function TimerControl({ icon, active }: Props) {
  return (
    <TouchableOpacity>
      <MaterialIcons
        name={icon}
        color={active ? "#ffffff" : "#cccccc"}
        size={22}
      />
    </TouchableOpacity>
  );
}
