import { Text, View } from "react-native";
import React from "react";
import { PostDetailScreenProps } from "../types";

export default function PostDetailView({ route }: PostDetailScreenProps) {
  const { story_url } = route.params;
  return (
    <View>
      <Text>{story_url}</Text>
    </View>
  );
}
