import { AppwriteUser } from "@/lib/appwrite/AppwriteUser";
import { useUserManager } from "@/lib/db/userManager";
import { AppwriteSkillType } from "@/types/AppwriteSkill";
import { LocalUser } from "@/types/LocalUser";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { ID } from "react-native-appwrite";

export default function Settings() {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [skillName, setSkillName] = useState("");
  const [creating, setCreating] = useState(false);
  const { getUserInfo } = useUserManager();

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  const createSkill = async () => {
    if (!skillName) {
      return console.error("Skill name cannot be empty");
    }
    if (skillName.length > 8) {
      return console.error("Skill name cannot exceed 8 characters");
    }

    try {
      setCreating(true);

      const id = ID.unique();

      await AppwriteUser.createSkill(skillName, AppwriteSkillType.Child, id);

      setSkillName("");
    } finally {
      setCreating(false);
    }
  };

  return (
    <View className="flex p-10">
      <View className="bg-red-400">
        <Text className="text-white text-xl">
          {"UID: "} {user?.id || "Loading..."}
        </Text>
        <Text className="text-white text-xl">
          {"Name: "} {user?.name || "Loading..."}
        </Text>
        <Text className="text-white text-xl">
          {"Email: "} {user?.email || "Loading..."}
        </Text>
      </View>

      <View>
        <Text className="text-white text-2xl mt-5 font-bold">
          {"Create Skill"}
        </Text>

        <View className="mt-2 gap-y-2">
          <TextInput
            placeholder="Skill Name"
            placeholderTextColor="#888"
            className="bg-white p-2 rounded"
            onChangeText={setSkillName}
            value={skillName}
          />

          <Button
            title={creating ? "Creating skill..." : "Add Skill"}
            onPress={createSkill}
            disabled={creating}
          />
        </View>
      </View>
    </View>
  );
}
