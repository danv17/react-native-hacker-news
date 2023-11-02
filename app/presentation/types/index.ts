import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: Pick<Post, "story_url" | "comment_text">;
};

export type PostDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "PostDetail"
>;

export type PostResponse = {
  hits: Post[];
};

export type Post = {
  objectID: string;
  author: string;
  title?: string;
  story_title?: string;
  story_url: string;
  comment_text: string;
  created_at: string;
  created_at_i: number;
};
