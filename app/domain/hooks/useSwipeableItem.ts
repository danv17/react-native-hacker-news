import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

export const useSwipeableItem = (): [
  (item: Swipeable | null) => void,
  (item: Swipeable | null) => void,
  () => void
] => {
  const [lastOpened, setLasOpened] = useState<Swipeable | null>(null);

  const closeOpened = (item: Swipeable | null) => {
    if (item && item != lastOpened) lastOpened?.close();
  };

  const onSwipeableOpen = (item: Swipeable | null) => {
    item && setLasOpened(item);
  };

  const closeLastOpened = () => {
    lastOpened?.close();
  };

  return [closeOpened, onSwipeableOpen, closeLastOpened];
};
