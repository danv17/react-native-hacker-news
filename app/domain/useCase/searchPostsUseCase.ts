import {
  HackerNewsLocalRepository,
  HackerNewsRemoteRepository,
  HackerNewsRepository,
} from "../../data/HackNewsRepository";

const local = new HackerNewsLocalRepository();
const remote = new HackerNewsRemoteRepository();
const repo = new HackerNewsRepository(local, remote);

class SearchPostsUseCase
  implements UseCase<HackerNewsItemResponse[], SearchPostsParamType>
{
  async execute({
    query,
  }: SearchPostsParamType): Promise<HackerNewsItemResponse[]> {
    try {
      return await repo.search(query);
    } catch (error) {
      throw error;
    }
  }
}

export default new SearchPostsUseCase();
