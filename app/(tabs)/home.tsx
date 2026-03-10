import ConfirmModal from "@/components/modals/confirm-modal";
import { ThemedText } from "@/components/themed-text";
import TimerContainer from "@/components/timer/timer-container";
import { AppwriteUser } from "@/lib/appwrite/AppwriteUser";
import { AppwriteSkill, AppwriteSkillType } from "@/types/AppwriteSkill";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [skills, setSkills] = useState<AppwriteSkill[]>([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    AppwriteUser.getSkills().then(setSkills);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-900">
        <TimerContainer />
        <ConfirmModal
          modalState={modalState}
          setModalState={setModalState}
          confirmAction={() => {
            AppwriteUser.deleteSkill(skills[0].$id).then(() => {
              setSkills(skills.slice(1));
            });
          }}
        />
        <View className="flex">
          {skills.map((skill) => (
            <View
              key={skill.$id}
              className="flex flex-row items-center justify-between p-2 m-2 bg-blue-900"
            >
              <View>
                <ThemedText>
                  {skill.name} [{AppwriteSkillType[skill.type]}]
                </ThemedText>
              </View>
              <View>
                <Pressable
                  className="p-1 bg-red-500"
                  onPress={() => {
                    setModalState(true);
                  }}
                >
                  <Text className="text-white">Delete</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
