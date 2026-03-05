import { Text, View } from "react-native";

export default function HeaderTitle() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
        {(() => {
          const d = new Date();
          return d.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          });
        })()}
      </Text>
    </View>
  );
}
