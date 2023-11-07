import { useContext, useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";
import detelePostUseCase from "../useCase/deletePostUseCase";
import { getTimeAgo } from "../utils";
import { HackerNewsReducerContext, HackerNewsStateContext } from "../context";
import likePostUseCase from "../useCase/likePostUseCase";
import searchPostsUseCase from "../useCase/searchPostsUseCase";

export const useHackerNewsViewModel = (): [
  data: HackerNew[],
  isLoading: boolean,
  isRefreshing: boolean,
  onDelete: (id: string) => void,
  onRefresh: () => void,
  loadMore: () => void,
  onLike: (id: string) => void
  // onSearch: (query: string) => void,
  // query: string,
  // onChangeQuery: (query: string) => void,
  // onClear: () => void
] => {
  const { isLoading, isRefreshing, isSearching, page, posts, query } =
    useContext(HackerNewsStateContext);
  const update = useContext(HackerNewsReducerContext);

  const onDelete = (id: string) => {
    detelePostUseCase
      .execute(id)
      .then(onRefresh)
      .catch((error) => console.log(error));
  };

  const onLike = (id: string) => {
    likePostUseCase
      .execute(id)
      .then((data) => {
        update?.({ posts: prepareData(data) });
      })
      .catch((error) => console.log(error));
  };

  // const searchData = (query: string) => {
  //   update?.({ isSearching: true });
  //   searchPostsUseCase
  //     .execute({ query })
  //     .then((data) => {
  //       update?.({ posts: prepareData(data), isSearching: false });
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => update?.({ isSearching: false }));
  // };

  // const onChangeQuery = (query: string) => {
  //   update?.({ query });
  // };

  // const onClear = () => {
  //   if (isSearching) {
  //     update?.({ query: "", isSearching: false });
  //   }
  // };

  const prepareData = (data: HackerNewsItemResponse[]) => {
    return data.map(
      ({
        author,
        comment_text,
        created_at,
        like,
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
          like,
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
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        update?.({ isLoading: false, isRefreshing: false, isSearching: false });
      });
  };

  const onRefresh = () => {
    update?.({ isRefreshing: true });
  };

  const loadMore = () => {
    update?.({ isLoading: true });
  };

  // const onSearch = (query: string) => {
  //   update?.({ isSearching: true, query });
  // };

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

  // useEffect(() => {
  //   if (isSearching) {
  //     searchData(query);
  //   }
  // }, [isSearching, query]);

  useEffect(fetchData, []);

  return [
    posts,
    isLoading,
    isRefreshing,
    onDelete,
    onRefresh,
    loadMore,
    onLike,
    // onSearch,
    // query,
    // onChangeQuery,
    // onClear,
  ];
};
