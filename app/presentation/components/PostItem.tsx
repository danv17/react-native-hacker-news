import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useRef } from "react";
import { Post, RootStackParamList } from "../types";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import SwipeButton from "./commons/SwipeButton";

export default function PostItem({
  author,
  closeLastOpened,
  closeOpened,
  created_at,
  id,
  like,
  onDelete,
  onLike,
  onSwipeableOpen,
  source,
  title,
}: Post) {
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
        <SwipeButton icon="trash" onPress={(e) => onDelete?.(id)} />
      )}
      renderLeftActions={() => (
        <SwipeButton
          icon="heart"
          onPress={(e) => {
            onLike?.(id);
            closeLastOpened();
          }}
          type="like"
          side="left"
          inverted={like}
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
        <View style={styles.background}>
          <View style={{ ...styles.item, ...(like ? styles.like : {}) }}>
            <Text style={styles.header}>{title}</Text>
            <View>
              <Text
                style={styles.subHeader}
              >{`${author} - ${created_at}`}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  item: {
    paddingHorizontal: 16,
    borderColor: "#666",
    backgroundColor: "#fff",
    rowGap: 5,
    height: 100,
    justifyContent: "center",
    borderRadius: 20,
    borderBlockColor: "black",
    borderWidth: 1,
  },
  header: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  subHeader: {
    color: "gray",
  },
  like: {
    backgroundColor: "#39768426",
    borderColor: "#397684",
    borderWidth: 2,
  },
});
