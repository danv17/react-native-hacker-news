import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";

export default function PostListView() {
  const [news, onDelete] = useHackerNewsViewModel();
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
      />
    </SafeAreaView>
  );
}
