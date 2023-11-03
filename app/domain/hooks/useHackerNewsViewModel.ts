import { useCallback, useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";
import { getTimeAgo } from "../utils";

export const useHackerNewsViewModel = (): [
  data: HackerNew[],
  isRefreshing: boolean,
  onDelete: (id: string) => void,
  fetchData: () => void
] => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hackerNews, setHackerNews] = useState<HackerNew[]>([]);

  const onDelete = (id: string) => {
    setHackerNews(hackerNews.filter((i) => i.id !== id));
  };

  const prepareData = (data: HackerNewsItemResponse[]) => {
    return data.map(
      ({
        author,
        comment_text,
        created_at,
        objectID,
        story_url,
        story_title,
        title,
      }) => {
        let source;
        if (story_url) {
          const ext = story_url.substring(story_url.lastIndexOf(".") + 1);
          if (ext === "pdf") {
            source = {
              uri: `http://docs.google.com/gview?embedded=true&url=${story_url}`,
            };
          } else {
            source = { uri: story_url };
          }
        } else {
          source = { html: comment_text };
        }
        return {
          author,
          created_at: getTimeAgo(created_at),
          id: objectID,
          source,
          title: <string>(title || story_title),
        };
      }
    );
  };

  const fetchData = () => {
    getNewsUseCase
      .execute()
      .then((data) => {
        if (data?.length) {
          setHackerNews(prepareData(data));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsRefreshing(false));
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(fetchData, []);

  return [hackerNews, isRefreshing, onDelete, onRefresh];
};
