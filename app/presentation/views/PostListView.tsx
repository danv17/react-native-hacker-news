import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";

export default function PostListView() {
  const [news, isRefreshing, onDelete, onRefresh, fetchData] =
    useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen, closeLastOpened] = useSwipeableItem();

  return (
    <SafeAreaView>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            closeLastOpened={closeLastOpened}
            closeOpened={closeOpened}
            onDelete={onDelete}
            onSwipeableOpen={onSwipeableOpen}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={fetchData}
      />
    </SafeAreaView>
  );
}
