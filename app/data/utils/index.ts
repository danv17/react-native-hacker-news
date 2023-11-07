import AsyncStorage from "@react-native-async-storage/async-storage";

export const reduceData = (
  data: HackerNewsItemResponse[],
  acc: { [key: string]: HackerNewsItemResponse },
  checkValues = false
): { [key: string]: HackerNewsItemResponse } => {
  return data.reduce<{ [key: string]: HackerNewsItemResponse }>(
    (
      _,
      {
        author,
        created_at,
        created_at_i,
        deleted,
        objectID,
        comment_text,
        story_title,
        story_url,
        title,
        url,
      }
    ) => {
      acc[objectID] = {
        author,
        comment_text,
        // comment_text:
        //   typeof comment_text === "undefined"
        //     ? ""
        //     : decodeURIComponent(comment_text),
        created_at,
        created_at_i,
        deleted: checkValues && deleted === undefined ? false : deleted,
        objectID,
        story_url:
          checkValues && typeof story_url === "undefined" ? "" : story_url,
        story_title:
          checkValues && typeof story_title === "undefined" ? "" : story_title,
        title: checkValues && typeof title === "undefined" ? "" : title,
        url,
      };
      return acc;
    },
    acc
  );
};

export const mergeData = (
  remoteData: HackerNewsItemResponse[],
  localData: HackerNewsItemResponse[]
): HackerNewsItemResponse[] => {
  try {
    let data: { [key: string]: HackerNewsItemResponse } = {};
    reduceData(remoteData, data, true);
    reduceData(localData, data);
    return Object.values(data);
  } catch (error) {
    throw error;
  }
};

export const getPage = async (
  page: number,
  isRefreshing = false
): Promise<number> => {
  try {
    const localPage = await AsyncStorage.getItem("currentPage");
    if (localPage) {
      const pageNumber: number = JSON.parse(localPage);
      if (isRefreshing) return pageNumber;
      const nextPage = localPage ? <number>JSON.parse(localPage) + 1 : page;
      return nextPage;
    }
    return page;
  } catch (error) {
    throw error;
  }
};
