type HackerNew = {
  author: string;
  created_at: string;
  id: string;
  source: { html: string } | { uri: string };
  title: string;
};

type GetNewsParamType = {
  page: number;
  isRefreshing: boolean;
};
