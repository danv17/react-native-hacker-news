import dataSourceInstance from "../../data/HackNewsRepository";

class DeletePostUseCase implements UseCase<void, string> {
  async execute(id: string): Promise<void> {
    try {
      dataSourceInstance.deletePost(id);
    } catch (error) {
      throw error;
    }
  }
}

const deletePostUseCase = Object.freeze(new DeletePostUseCase());

export default deletePostUseCase;
