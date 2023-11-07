import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPage, mergeData, reduceData } from "./utils";

export class HackerNewsRepository implements HackerNewsDataSource {
  constructor(
    private local: HackerNewsLocalDataSource,
    private remote: HackerNewsRemoteDataSource
  ) {}

  async deletePost(id: string): Promise<void> {
    try {
      return await this.local.deletePost(id);
    } catch (error) {
      throw error;
    }
  }
  async getNews(
    page: number = 0,
    isRefreshing: boolean
  ): Promise<HackerNewsItemResponse[]> {
    let response: HackerNewsItemResponse[];
    try {
      // await AsyncStorage.multiRemove(["page", "currentPage", "posts"]);
      // return [];
      const nextPage = await getPage(page, isRefreshing);
      const { hits, page: currentPage } = await this.remote.getNews(nextPage);
      const remoteNews = hits.map(
        ({
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
        }) => ({
          author,
          comment_text,
          // comment_text:
          //   typeof comment_text === "undefined"
          //     ? ""
          //     : decodeURIComponent(comment_text),
          created_at,
          created_at_i,
          deleted: deleted === undefined ? false : deleted,
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
      response = mergedData.filter((d) => !d.deleted);
      if (response.length) {
        response = response.sort((a, b) => b.created_at_i - a.created_at_i);
      }
    } catch (error) {
      await AsyncStorage.removeItem("posts");
      response = await this.local.getNews();
    }
    return response;
  }
}

export class HackerNewsRemoteRepository implements HackerNewsRemoteDataSource {
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

export class HackerNewsLocalRepository implements HackerNewsLocalDataSource {
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
}
