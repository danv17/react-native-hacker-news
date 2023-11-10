import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import {
  Swipeable,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import PostItem from "../components/PostItem";
import { useHackerNewsViewModel } from "../../domain/hooks/useHackerNewsViewModel";
import Loading from "../components/commons/Loading";
import { useSwipeableItem } from "../../domain/hooks/useSwipeableItem";
import { useScroll } from "../../domain/hooks/useScroll";
import Container from "../components/commons/Container";

export default function PostListView() {
  const [
    news,
    isLoading,
    isRefreshing,
    onDelete,
    onRefresh,
    onEndReached,
    onLike,
    onSearch,
    onClear,
    query,
    onChangeQuery,
  ] = useHackerNewsViewModel();
  const [closeOpened, onSwipeableOpen, closeLastOpened] = useSwipeableItem();
  const [isTop, scrollTop, onScroll, onStartReached] = useScroll();
  const flRef = useRef<FlatList<HackerNew>>(null);

  const renderItem: ListRenderItem<HackerNew> = useCallback(
    ({ item }) => (
      <PostItem
        {...item}
        onDelete={onDelete}
        closeLastOpened={closeLastOpened}
        closeOpened={closeOpened}
        onSwipeableOpen={onSwipeableOpen}
        onLike={onLike}
      />
    ),
    []
  );

  const renderListHeader = useMemo(
    () => (
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          backgroundColor: "#FFF",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 20,
            height: 50,
            fontSize: 16,
            paddingHorizontal: 16,
            flex: 1,
            zIndex: 1,
            width: "50%",
          }}
          placeholder="Search by title"
          onEndEditing={({ nativeEvent: { text } }) => onSearch(text)}
          value={query}
          onChangeText={onChangeQuery}
        />
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
          }}
          onPress={onClear}
        >
          <Text
            style={{
              paddingHorizontal: 16,
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              color: "teal",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [query]
  );

  const renderFloatingButton = useMemo(() => {
    return (
      !isTop && (
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
      )
    );
  }, [isTop]);

  return (
    <Container>
      {renderFloatingButton}
      <FlatList
        ref={flRef}
        data={news}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={() => isLoading && <Loading />}
        onScroll={onScroll}
        onStartReached={onStartReached}
        onEndReachedThreshold={2}
      />
    </Container>
  );
}
