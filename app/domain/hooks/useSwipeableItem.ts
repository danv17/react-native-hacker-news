import { useCallback, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

export const useSwipeableItem = (): [
  () => void,
  (item: Swipeable | null) => void
] => {
  const [lastOpened, setLasOpened] = useState<Swipeable | null>(null);

  const closeOpened = useCallback(() => {
    lastOpened?.close();
  }, [lastOpened]);

  const onSwipeableOpen = (item: Swipeable | null) => {
    item && setLasOpened(item);
  };

  return [closeOpened, onSwipeableOpen];
};
