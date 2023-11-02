import { useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";
import { getTimeAgo } from "../utils";
import { Swipeable } from "react-native-gesture-handler";

export const useHackerNewsViewModel = (): [
  data: HackerNew[],
  onDelete: (id: string) => void
] => {
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

  useEffect(() => {
    getNewsUseCase
      .execute()
      .then((data) => {
        if (data?.length) {
          setHackerNews(prepareData(data));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return [hackerNews, onDelete];
};
