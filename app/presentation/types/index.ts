import { StackScreenProps } from "@react-navigation/stack";

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
  id: string;
  author: string;
  created_at: string;
  source: { html: string } | { uri: string };
  title: string;
};
