import { useEffect, useState } from "react";
import getNewsUseCase from "../useCase/getNewsUseCase";

export const useHackerNewsViewModel = () => {
  const [hackerNews, setHackerNews] = useState<HackerNewsItem[]>([]);

  useEffect(() => {
    getNewsUseCase
      .execute()
      .then((data) => setHackerNews(data))
      .catch((error) => console.log(error));
  }, []);

  return [hackerNews];
};
