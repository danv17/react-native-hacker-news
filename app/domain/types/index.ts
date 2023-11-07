type HackerNew = {
  author: string;
  created_at: string;
  id: string;
  like: boolean;
  source: { html: string } | { uri: string };
  title: string;
};

type GetNewsParamType = {
  page: number;
  isRefreshing: boolean;
};

type SearchPostsParamType = {
  query: string;
};
