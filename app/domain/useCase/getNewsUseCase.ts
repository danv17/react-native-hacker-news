import {
  HackerNewsLocalRepository,
  HackerNewsRemoteRepository,
  HackerNewsRepository,
} from "../../data/HackNewsRepository";

const local = new HackerNewsLocalRepository();
const remote = new HackerNewsRemoteRepository();
const repo = new HackerNewsRepository(local, remote);

class GetNewsUseCase implements UseCase<HackerNewsItem[]> {
  async execute(): Promise<HackerNewsItem[]> {
    try {
      return await repo.getNews();
    } catch (error) {
      throw error;
    }
  }
}

export default new GetNewsUseCase();
