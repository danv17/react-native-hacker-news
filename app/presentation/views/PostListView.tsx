import { Text, View } from "react-native";
import React from "react";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import { FlatList } from "react-native-gesture-handler";

export default function PostListView() {
  const [news] = useHackerNewsViewModel();
  return (
    <View>
      <Text>PostListView</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => <Text>{item.author}</Text>}
      />
    </View>
  );
}
