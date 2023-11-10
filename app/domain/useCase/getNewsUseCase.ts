import dataSourceInstance from "../../data/HackNewsRepository";

class GetNewsUseCase
  implements UseCase<HackerNewsItemResponse[], GetNewsParamType>
{
  async execute({
    page,
    isRefreshing,
    query,
  }: GetNewsParamType): Promise<HackerNewsItemResponse[]> {
    try {
      return await dataSourceInstance.getNews(page, isRefreshing, query);
    } catch (error) {
      throw error;
    }
  }
}

const getNewsUseCase = Object.freeze(new GetNewsUseCase());

export default getNewsUseCase;
