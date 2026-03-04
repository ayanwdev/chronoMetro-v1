import { useThemeColor } from "@/hooks/use-theme-color";
import { cssInterop } from "nativewind";
import { Text, type TextProps } from "react-native";

export type Props = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

function ThemedTextBase({
  lightColor,
  darkColor,
  type = "default",
  style,
  className,
  ...rest
}: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const typeClasses = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-[32px] leading-8 font-bold",
    subtitle: "text-xl font-bold",
    link: "text-base leading-[30px] text-[#0a7ea4]",
  }[type];

  return (
    <Text
      {...rest}
      className={`${typeClasses} ${className ?? ""}`}
      style={[{ color }, style]}
    />
  );
}

export const ThemedText = ThemedTextBase;

cssInterop(ThemedText, {
  className: "style",
});
