import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";

export default function PostListView() {
  const [news] = useHackerNewsViewModel();
  return (
    <SafeAreaView>
      <FlatList
        data={news}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => <PostItem {...item} />}
      />
    </SafeAreaView>
  );
}
