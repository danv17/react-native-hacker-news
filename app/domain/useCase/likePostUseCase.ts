import dataSourceInstance from "../../data/HackNewsRepository";

class LikePostUseCase implements UseCase<HackerNewsItemResponse[], string> {
  async execute(id: string): Promise<HackerNewsItemResponse[]> {
    try {
      return dataSourceInstance.likePost(id);
    } catch (error) {
      throw error;
    }
  }
}

const likePostUseCase = Object.freeze(new LikePostUseCase());

export default likePostUseCase;
