import React from "react";
import { View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import TimerControl from "./timer-control";

const TimerContainer = () => {
  return (
    <ThemedView className="justify-between h-1/4 pb-4">
      <View className="p-2"></View>
      <ThemedText className="font-mono text-center text-5xl p-4">
        {"01:23:45"}
      </ThemedText>
      <View className="flex flex-row justify-center px-2">
        <TimerControl icon="close" active={false} />
        <TimerControl icon="play" active={false} />
        <TimerControl icon="pause" active={false} />
        <TimerControl icon="refresh" active={false} />
        <TimerControl icon="fullscreen" active={false} />
      </View>
    </ThemedView>
  );
};

export default TimerContainer;
