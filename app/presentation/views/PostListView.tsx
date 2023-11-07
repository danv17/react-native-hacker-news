import React, { useCallback, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import Loading from "../components/commons/Loading";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";
import {
  HackerNewsReducerContext,
  HackerNewsStateContext,
} from "../../domain/context";
import { useScroll } from "../../domain/hooks/useScroll";

export default function PostListView() {
  const [news, isLoading, isRefreshing, onDelete, onRefresh, loadMore] =
    useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen, closeLastOpened] = useSwipeableItem();
  const [isTop, scrollTop, onScroll, onStartReached] = useScroll();
  const ref = useRef<FlatList<HackerNew>>(null);

  // const goUp = useCallback(() => {
  //   if (ref.current) {
  //     ref.current.scrollToIndex({ animated: true, index: 0 });
  //     !isTop && update?.({ isTop: true });
  //   }
  // }, [isTop]);

  // const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   if (e.nativeEvent.contentOffset.y > 200) {
  //     isTop && update?.({ isTop: false });
  //   } else {
  //     !isTop && update?.({ isTop: true });
  //   }
  // };

  return (
    <SafeAreaView>
      {!isTop && (
        <View
          style={{ position: "absolute", bottom: 25, right: 25, zIndex: 1 }}
        >
          <Pressable
            onPress={() => scrollTop(ref.current)}
            style={{
              opacity: 0.75,
              backgroundColor: "gray",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <FontAwesome5 name="arrow-up" />
          </Pressable>
        </View>
      )}
      <FlatList
        ref={ref}
        data={news}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            onDelete={onDelete}
            closeLastOpened={closeLastOpened}
            closeOpened={closeOpened}
            onSwipeableOpen={onSwipeableOpen}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => isLoading && <Loading />}
        onScroll={onScroll}
        onStartReached={onStartReached}
        // onStartReachedThreshold={100}
      />
    </SafeAreaView>
  );
}
