type HackerNews = {
  hits: HackerNewsItem[];
};

type HackerNewsItem = {
  objectID: string;
  author: string;
  title?: string;
  story_title?: string;
  created_at_i: number;
  created_at: string;
  story_url: string;
  comment_text: string;
};
