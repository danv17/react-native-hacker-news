import AsyncStorage from "@react-native-async-storage/async-storage";

export class HackerNewsRepository implements HackerNewsDataSource {
  constructor(
    private local: HackerNewsLocalDataSource,
    private remote: HackerNewsRemoteDataSource
  ) {}
  async getNews(): Promise<HackerNewsItem[]> {
    let response: HackerNewsItem[];
    try {
      const news = await this.remote.getNews();
      this.local.saveNews(news.hits);
      response = news.hits;
    } catch (error) {
      response = await this.local.getNews();
    }
    return response;
  }
}

export class HackerNewsRemoteRepository implements HackerNewsRemoteDataSource {
  async getNews(): Promise<HackerNews> {
    try {
      const response = await fetch(
        "https://hn.algolia.com/api/v1/search_by_date?query=mobile"
      );
      const json = response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }
}

export class HackerNewsLocalRepository implements HackerNewsLocalDataSource {
  async getNews(): Promise<HackerNewsItem[]> {
    try {
      const item = await AsyncStorage.getItem("news");
      if (item) {
        const obj: HackerNewsItem[] = JSON.parse(item);
        return obj;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  async saveNews(news: HackerNewsItem[]) {
    try {
      await AsyncStorage.setItem("news", JSON.stringify(news));
    } catch (error) {
      throw error;
    }
  }
}
