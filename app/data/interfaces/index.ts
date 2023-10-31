interface HackerNewsDataSource {
  getNews(): Promise<HackerNewsItem[]>;
}

interface HackerNewsLocalDataSource {
  getNews(): Promise<HackerNewsItem[]>;
  saveNews(news: HackerNewsItem[]): void;
}

interface HackerNewsRemoteDataSource {
  getNews(): Promise<HackerNews>;
}
