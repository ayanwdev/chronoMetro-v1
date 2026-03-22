import ModalTester from "@/components/modal-manager/modal-tester";
import { ThemedText } from "@/components/themed-text";
import TimerContainer from "@/components/timer/timer-container";
import { useAccount } from "@/hooks/use-account";
import { useModalManager } from "@/lib/modalManager";
import { AppwriteSkill, AppwriteSkillType } from "@/types/AppwriteSkill";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { BounceInLeft } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [skills, setSkills] = useState<AppwriteSkill[]>([]);
  const modal = useModalManager();
  const { listSkills, deleteSkill, signOut } = useAccount();

  useFocusEffect(
    useCallback(() => {
      listSkills().then(setSkills);
    }, [listSkills]),
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-900">
        <TimerContainer />
        {process.env.NODE_ENV === "development" && <ModalTester />}
        <View className="flex">
          {skills.map((skill) => (
            <Animated.View
              key={skill.$id}
              className="flex flex-row items-center justify-between p-2 m-2 bg-blue-900"
              entering={BounceInLeft}
            >
              <View>
                <ThemedText>
                  {skill.name} [{AppwriteSkillType[skill.type]}]
                </ThemedText>
              </View>
              <Pressable
                className="p-1 bg-red-500"
                onPress={() => {
                  modal.show("confirm", {
                    text: `Delete ${skill.name}?`,
                    confirmAction: () => {
                      deleteSkill(skill.$id).then(() => {
                        setSkills((prev) =>
                          prev.filter((s) => s.$id !== skill.$id),
                        );
                      });
                    },
                  });
                }}
              >
                <Text className="text-white">Delete</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
        <Pressable onPress={signOut}>
          <Text className="text-white text-2xl underline">{"[Sign Out]"}</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
