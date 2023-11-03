import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";

export default function PostListView() {
  const [news, isRefreshing, onDelete, onRefresh] = useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen] = useSwipeableItem();

  return (
    <SafeAreaView>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            onDelete={onDelete}
            closeOpened={closeOpened}
            onSwipeableOpen={onSwipeableOpen}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}
