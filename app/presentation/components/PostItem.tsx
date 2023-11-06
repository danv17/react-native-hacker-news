import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useRef } from "react";
import { Post, RootStackParamList } from "../types";
import { Swipeable } from "react-native-gesture-handler";
import Button from "./commons/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function PostItem({
  author,
  closeLastOpened,
  closeOpened,
  created_at,
  id,
  onDelete,
  onSwipeableOpen,
  source,
  title,
}: Post & {
  onDelete?: (id: string) => void;
  closeOpened?: (item: Swipeable | null) => void;
  onSwipeableOpen?: (item: Swipeable | null) => void;
  closeLastOpened?: () => void;
}) {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList,
        undefined
      >
    >();

  const item = useRef<Swipeable>(null);

  return (
    <Swipeable
      renderRightActions={() => (
        <Button
          title="Delete"
          onPress={(e) => onDelete?.(id)}
          type="secondary"
        />
      )}
      overshootRight={false}
      ref={item}
      onSwipeableWillOpen={() => closeOpened?.(item.current)}
      onSwipeableOpen={() => onSwipeableOpen?.(item.current)}
    >
      <Pressable
        onPress={() => {
          closeLastOpened?.();
          navigation.navigate("PostDetail", {
            source,
          });
        }}
      >
        <View style={styles.item}>
          <Text style={styles.header}>{title}</Text>
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
