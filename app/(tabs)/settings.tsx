import { account } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function Settings() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  useEffect(() => {
    account.get().then(setUser).catch(console.error);
  }, []);

  return (
    <>
      <View className="flex p-10 bg-red-400">
        <Text className="text-white text-xl">
          Welcome, {user?.name || "Loading..."}
        </Text>
      </View>
    </>
  );
}
