import dataSourceInstance from "../../data/HackNewsRepository";

class SearchPostsUseCase
  implements UseCase<HackerNewsItemResponse[], SearchPostsParamType>
{
  async execute({
    query,
  }: SearchPostsParamType): Promise<HackerNewsItemResponse[]> {
    try {
      return await dataSourceInstance.getNews(0, false, query);
    } catch (error) {
      throw error;
    }
  }
}

const searchPostsUseCase = Object.freeze(new SearchPostsUseCase());

export default searchPostsUseCase;
