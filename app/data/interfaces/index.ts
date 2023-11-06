interface HackerNewsDataSource {
  getNews(
    page: number,
    isRefreshing: boolean
  ): Promise<HackerNewsItemResponse[]>;
  deletePost(id: string): Promise<void>;
}

interface HackerNewsLocalDataSource {
  getNews(): Promise<HackerNewsItemResponse[]>;
  saveNews(news: HackerNewsItemResponse[]): Promise<void>;
  deletePost(id: string): Promise<void>;
}

interface HackerNewsRemoteDataSource {
  getNews(page: number): Promise<HackerNewsResponse>;
}
