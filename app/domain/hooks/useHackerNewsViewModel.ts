import { useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";
import detelePostUseCase from "../useCase/deletePostUseCase";
import { getTimeAgo } from "../utils";

export const useHackerNewsViewModel = (): [
  data: HackerNew[],
  isLoading: boolean,
  isRefreshing: boolean,
  onDelete: (id: string) => void,
  onRefresh: () => void,
  loadMore: () => void
] => {
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hackerNews, setHackerNews] = useState<HackerNew[]>([]);

  const onDelete = async (id: string) => {
    detelePostUseCase
      .execute(id)
      .then(onRefresh)
      .catch((error) => console.log(error));
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
          source = { html: comment_text || "" };
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
      .execute({ page, isRefreshing })
      .then((data) => {
        if (data?.length) {
          setHackerNews(prepareData(data));
          setPage(page + 1);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsRefreshing(false);
        setIsLoading(false);
      });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
  };

  const loadMore = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isRefreshing) {
      fetchData();
    }
  }, [isRefreshing]);

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  useEffect(fetchData, []);

  return [hackerNews, isLoading, isRefreshing, onDelete, onRefresh, loadMore];
};
