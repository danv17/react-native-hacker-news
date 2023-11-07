interface HackerNewsDataSource {
  getNews(
    page: number,
    isRefreshing: boolean
  ): Promise<HackerNewsItemResponse[]>;
  deletePost(id: string): Promise<void>;
  likePost(id: string): Promise<HackerNewsItemResponse[]>;
  search(query: string): Promise<HackerNewsItemResponse[]>;
}

interface HackerNewsLocalDataSource {
  getNews(): Promise<HackerNewsItemResponse[]>;
  saveNews(news: HackerNewsItemResponse[]): Promise<void>;
  deletePost(id: string): Promise<void>;
  likePost(id: string): Promise<HackerNewsItemResponse[]>;
  search(query: string): Promise<HackerNewsItemResponse[]>;
}

interface HackerNewsRemoteDataSource {
  getNews(page: number): Promise<HackerNewsResponse>;
}
