import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: undefined;
};

export type PostDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "PostDetail"
>;
