import HomeHeaderTitle from "@/components/home-header-title";
import TabIcon from "@/components/tab-icon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  const screens: {
    path: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      path: "home",
      title: "Home",
      icon: "time-sharp",
    },
    {
      path: "stats",
      title: "Statistics",
      icon: "stats-chart-sharp",
    },
    {
      path: "settings",
      title: "Settings",
      icon: "settings-sharp",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2B7FFF",
        headerShadowVisible: false,
        headerTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
        headerStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.path}
          name={screen.path}
          options={{
            title: screen.title,
            headerTitle:
              screen.title === "Home" ? HomeHeaderTitle : screen.title,
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => (
              <TabIcon name={screen.icon} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
