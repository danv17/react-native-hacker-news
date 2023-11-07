import { StackScreenProps } from "@react-navigation/stack";
import { Swipeable } from "react-native-gesture-handler";

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: Pick<Post, "source">;
};

export type PostDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "PostDetail"
>;

export type PostResponse = {
  hits: Post[];
};

export type Post = {
  author: string;
  closeLastOpened: () => void;
  closeOpened: (item: Swipeable | null) => void;
  created_at: string;
  id: string;
  like: boolean;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
  onSwipeableOpen: (item: Swipeable | null) => void;
  source: { html: string } | { uri: string };
  title: string;
};
