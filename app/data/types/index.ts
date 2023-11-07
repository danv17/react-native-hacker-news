type HackerNewsResponse = {
  hits: HackerNewsItemResponse[];
  page: number;
};

type HackerNewsItemResponse = {
  author: string;
  created_at: string;
  created_at_i: number;
  comment_text?: string;
  deleted: boolean;
  like: boolean;
  objectID: string;
  story_title?: string;
  story_url?: string;
  title?: string;
  url?: string;
};
