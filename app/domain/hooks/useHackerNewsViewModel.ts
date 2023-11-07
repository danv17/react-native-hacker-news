import { useContext, useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";
import detelePostUseCase from "../useCase/deletePostUseCase";
import { getTimeAgo } from "../utils";
import { HackerNewsReducerContext, HackerNewsStateContext } from "../context";

export const useHackerNewsViewModel = (): [
  data: HackerNew[],
  isLoading: boolean,
  isRefreshing: boolean,
  onDelete: (id: string) => void,
  onRefresh: () => void,
  loadMore: () => void
] => {
  const { isLoading, isRefreshing, page, posts } = useContext(
    HackerNewsStateContext
  );
  const update = useContext(HackerNewsReducerContext);
  // const [page, setPage] = useState(0);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [hackerNews, setHackerNews] = useState<HackerNew[]>([]);

  const onDelete = (id: string) => {
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
        url,
      }) => {
        let source;
        const postUrl = story_url || url;
        if (postUrl) {
          const ext = postUrl.substring(postUrl.lastIndexOf(".") + 1);
          if (ext === "pdf") {
            source = {
              uri: `http://docs.google.com/gview?embedded=true&url=${postUrl}`,
            };
          } else {
            source = { uri: postUrl };
          }
        } else {
          source = { html: decodeURI(comment_text || "") };
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
          update?.({ posts: prepareData(data), page: page + 1 });
          // setHackerNews(prepareData(data));
          // setPage(page + 1);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        update?.({ isLoading: false, isRefreshing: false });
        // setIsRefreshing(false);
        // setIsLoading(false);
      });
  };

  const onRefresh = () => {
    update?.({ isRefreshing: true });
    // setIsRefreshing(true);
  };

  const loadMore = () => {
    update?.({ isLoading: true });
    // setIsLoading(true);
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

  return [posts, isLoading, isRefreshing, onDelete, onRefresh, loadMore];
};
