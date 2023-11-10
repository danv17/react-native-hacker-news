import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPage, mergeData, reduceData } from "./utils";

class HackerNewsRepository implements HackerNewsDataSource {
  constructor(
    private local: HackerNewsLocalDataSource,
    private remote: HackerNewsRemoteDataSource
  ) {}

  async likePost(id: string): Promise<HackerNewsItemResponse[]> {
    try {
      const data = await this.local.likePost(id);
      return data
        ?.filter((d) => !d.deleted)
        .sort((a, b) => b.created_at_i - a.created_at_i);
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      this.local.deletePost(id);
    } catch (error) {
      throw error;
    }
  }
  async getNews(
    page: number = 0,
    isRefreshing: boolean,
    query: string = ""
  ): Promise<HackerNewsItemResponse[]> {
    let response: HackerNewsItemResponse[];
    try {
      // await AsyncStorage.multiRemove(["posts", "currentPage"]);
      // return [];
      const nextPage = await getPage(page, isRefreshing);
      const { hits, page: currentPage } = await this.remote.getNews(nextPage);
      const remoteNews = hits.map(
        ({
          author,
          created_at,
          created_at_i,
          deleted,
          like,
          objectID,
          story_title,
          story_url,
          title,
          url,
        }) => ({
          author,
          created_at,
          created_at_i,
          deleted: deleted === undefined ? false : deleted,
          like: like === undefined ? false : like,
          objectID,
          story_url: typeof story_url === "undefined" ? "" : story_url,
          story_title: typeof story_title === "undefined" ? "" : story_title,
          title: typeof title === "undefined" ? "" : title,
          url,
        })
      );
      const localNews = await this.local.getNews();
      const mergedData = mergeData(remoteNews, localNews);
      await this.local.saveNews(mergedData);
      await AsyncStorage.setItem("currentPage", String(currentPage));
      response = mergedData.filter(
        (d) =>
          !d.deleted &&
          (d.title?.toLowerCase().includes(query.toLowerCase()) ||
            d.story_title?.toLowerCase().includes(query.toLowerCase()))
      );
      if (response.length) {
        response = response.sort((a, b) => b.created_at_i - a.created_at_i);
      }
    } catch (error) {
      await AsyncStorage.removeItem("posts");
      response = await this.local.getNews();
    }
    return response;
  }

  async search(query: string) {
    try {
      return await this.local.search(query);
    } catch (error) {
      throw error;
    }
  }
}

class HackerNewsRemoteRepository implements HackerNewsRemoteDataSource {
  async getNews(page: number = 0): Promise<HackerNewsResponse> {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=mobile&page=${page}`
      );
      const json: HackerNewsResponse = await response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }
}

class HackerNewsLocalRepository implements HackerNewsLocalDataSource {
  async likePost(id: string): Promise<HackerNewsItemResponse[]> {
    try {
      const item = await AsyncStorage.getItem("posts");
      if (item) {
        const obj: { [key: string]: HackerNewsItemResponse } = JSON.parse(item);
        if (obj && obj[id]) {
          const hasLike = obj[id].like;
          obj[id].like = !hasLike;
          this.saveNews(Array.from(Object.values(obj)));
        }
      }
      return this.getNews();
    } catch (error) {
      throw error;
    }
  }
  async deletePost(id: string): Promise<void> {
    try {
      const item = await AsyncStorage.getItem("posts");
      if (item) {
        const obj = JSON.parse(item);
        if (obj && obj[id]) {
          obj[id].deleted = true;
          this.saveNews(Array.from(Object.values(obj)));
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async getNews(): Promise<HackerNewsItemResponse[]> {
    try {
      const item = await AsyncStorage.getItem("posts");
      if (item) {
        const obj: { [key: string]: HackerNewsItemResponse } = JSON.parse(item);
        return Object.values(obj);
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  async saveNews(news: HackerNewsItemResponse[]) {
    try {
      let obj: { [key: string]: HackerNewsItemResponse } = {};
      reduceData(news, obj, true);
      await AsyncStorage.setItem("posts", JSON.stringify(obj));
    } catch (error) {
      throw error;
    }
  }

  async search(query: string = "") {
    try {
      const news = await this.getNews();
      return news
        .filter(
          (n) =>
            !n.deleted &&
            (n.title?.toLowerCase().includes(query.toLowerCase()) ||
              n.story_title?.toLowerCase().includes(query.toLowerCase()))
        )
        .sort((a, b) => b.created_at_i - a.created_at_i);
    } catch (error) {
      throw error;
    }
  }
}

const dataSourceInstance = Object.freeze(
  new HackerNewsRepository(
    new HackerNewsLocalRepository(),
    new HackerNewsRemoteRepository()
  )
);

export default dataSourceInstance;
