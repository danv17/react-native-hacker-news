import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import Loading from "../components/commons/Loading";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";
import { useScroll } from "../../domain/hooks/useScroll";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PostListView() {
  const [news, isLoading, isRefreshing, onDelete, onRefresh, loadMore, onLike] =
    useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen, closeLastOpened] = useSwipeableItem();
  const [isTop, scrollTop, onScroll, onStartReached] = useScroll();
  const flRef = useRef<FlatList<HackerNew>>(null);

  return (
    <SafeAreaView>
      {!isTop && (
        <View
          style={{ position: "absolute", bottom: 25, right: 25, zIndex: 1 }}
        >
          <TouchableOpacity
            onPress={() => scrollTop(flRef.current)}
            style={{
              opacity: 0.75,
              backgroundColor: "gray",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <FontAwesome5 name="arrow-up" size={16} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        ref={flRef}
        data={news}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            onDelete={onDelete}
            closeLastOpened={closeLastOpened}
            closeOpened={closeOpened}
            onSwipeableOpen={onSwipeableOpen}
            onLike={onLike}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => isLoading && <Loading />}
        onScroll={onScroll}
        onStartReached={onStartReached}
        onEndReachedThreshold={2}
      />
    </SafeAreaView>
  );
}
