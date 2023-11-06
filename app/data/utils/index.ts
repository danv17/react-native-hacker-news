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
      }
    ) => {
      acc[objectID] = {
        author,
        // comment_text:
        //   typeof comment_text === "undefined" ? "" : comment_text,
        created_at,
        created_at_i,
        deleted: checkValues && deleted === undefined ? false : deleted,
        objectID,
        story_url:
          checkValues && typeof story_url === "undefined" ? "" : story_url,
        story_title:
          checkValues && typeof story_title === "undefined" ? "" : story_title,
        title: checkValues && typeof title === "undefined" ? "" : title,
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

export const getPage = async (page: number): Promise<number> => {
  try {
    const localPage = await AsyncStorage.getItem("currentPage");
    console.log("localPage", localPage);
    const nextPage = localPage ? <number>JSON.parse(localPage) + 1 : page;
    return nextPage;
  } catch (error) {
    throw error;
  }
};
