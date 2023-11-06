import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";

export default function PostListView() {
  const [news, isLoading, isRefreshing, onDelete, onRefresh, loadMore] =
    useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen, closeLastOpened] = useSwipeableItem();
  const ref = useRef<FlatList<HackerNew>>(null);

  return (
    <SafeAreaView>
      <FlatList
        ref={ref}
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
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ marginVertical: 25 }}>
            <View style={StyleSheet.absoluteFillObject}>
              {isLoading && <ActivityIndicator size="large" />}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
