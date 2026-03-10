import { AppwriteUser } from "@/lib/appwrite/AppwriteUser";
import { AppwriteSkillType } from "@/types/AppwriteSkill";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function Settings() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  const [skillName, setSkillName] = useState("");

  useEffect(() => {
    AppwriteUser.getUser().then(setUser);
  }, []);

  return (
    <View className="flex p-10">
      <View className="bg-red-400">
        <Text className="text-white text-xl">
          User: {user?.name || "Loading..."}
        </Text>
        <Text className="text-white text-xl">
          Email: {user?.email || "Loading..."}
        </Text>
      </View>
      <View>
        <Text className="text-white text-2xl mt-5 font-bold">Create Skill</Text>
        <View className="mt-2 gap-y-2">
          <TextInput
            placeholder="Skill Name"
            placeholderTextColor="#888"
            className="bg-white p-2 rounded"
            onChangeText={(text) => setSkillName(text)}
            value={skillName}
          />
          <Button
            title="Add Skill"
            onPress={async () => {
              if (!skillName) {
                return console.error("Skill name cannot be empty");
              }
              if (skillName.length > 8) {
                return console.error("Skill name cannot exceed 100 characters");
              }
              await AppwriteUser.createSkill(
                skillName,
                AppwriteSkillType.Child,
              );
              setSkillName("");
              // Optionally refresh list or show feedback
            }}
          />
        </View>
      </View>
    </View>
  );
}
