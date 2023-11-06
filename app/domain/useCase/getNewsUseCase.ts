import {
  HackerNewsLocalRepository,
  HackerNewsRemoteRepository,
  HackerNewsRepository,
} from "../../data/HackNewsRepository";

const local = new HackerNewsLocalRepository();
const remote = new HackerNewsRemoteRepository();
const repo = new HackerNewsRepository(local, remote);
class GetNewsUseCase
  implements UseCase<HackerNewsItemResponse[], GetNewsParamType>
{
  async execute({
    page,
    isRefreshing,
  }: GetNewsParamType): Promise<HackerNewsItemResponse[]> {
    try {
      return await repo.getNews(page, isRefreshing);
    } catch (error) {
      throw error;
    }
  }
}

export default new GetNewsUseCase();
