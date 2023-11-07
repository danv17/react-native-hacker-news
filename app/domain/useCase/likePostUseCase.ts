import {
  HackerNewsLocalRepository,
  HackerNewsRemoteRepository,
  HackerNewsRepository,
} from "../../data/HackNewsRepository";

const local = new HackerNewsLocalRepository();
const remote = new HackerNewsRemoteRepository();
const repo = new HackerNewsRepository(local, remote);

class LikePostUseCase implements UseCase<HackerNewsItemResponse[], string> {
  async execute(id: string): Promise<HackerNewsItemResponse[]> {
    try {
      return repo.likePost(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new LikePostUseCase();
