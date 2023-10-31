import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Post, RootStackParamList } from "../types";
import { Swipeable } from "react-native-gesture-handler";
import Button from "./commons/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function PostItem({
  author,
  title,
  story_title,
  story_url,
  created_at,
  created_at_i,
}: Post) {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
      >
    >();

  return (
    <Swipeable
      renderRightActions={() => (
        <Button title="Delete" onPress={() => {}} type="secondary" />
      )}
      overshootRight={false}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("PostDetail", {
            story_url,
          })
        }
      >
        <View style={styles.item}>
          <Text style={styles.header}>{story_title || title}</Text>
          <View>
            <Text style={styles.subHeader}>{`${author} - ${created_at}`}</Text>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    borderColor: "#666",
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    rowGap: 5,
    height: 100,
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  subHeader: {
    color: "gray",
  },
});
