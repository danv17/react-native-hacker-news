interface HackerNewsDataSource {
  getNews(): Promise<HackerNewsItemResponse[]>;
}

interface HackerNewsLocalDataSource {
  getNews(): Promise<HackerNewsItemResponse[]>;
  saveNews(news: HackerNewsItemResponse[]): void;
}

interface HackerNewsRemoteDataSource {
  getNews(): Promise<HackerNewsResponse>;
}
