import { useContext, useEffect, useState } from "react";
import { HackerNewsReducerContext, HackerNewsStateContext } from "../context";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

export const useScroll = (): [
  isTop: boolean,
  scrollTop: (ref: FlatList | null) => void,
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
  onStartReached: () => void
] => {
  const { isTop } = useContext(HackerNewsStateContext);
  const update = useContext(HackerNewsReducerContext);
  const [toTop, setToTop] = useState(false);

  const scrollTop = (ref: FlatList | null) => {
    if (!isTop && ref) {
      ref.scrollToIndex({ animated: true, index: 0, viewOffset: 100 });
      update?.({ isTop: true });
      setToTop(true);
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!toTop) {
      if (e.nativeEvent.contentOffset.y > 200) {
        isTop && update?.({ isTop: false });
      } else {
        !isTop && update?.({ isTop: true });
      }
    }
  };

  const onStartReached = () => {
    !isTop && update?.({ isTop: true });
    setToTop(false);
  };

  return [isTop, scrollTop, onScroll, onStartReached];
};
