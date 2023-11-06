import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  HackerNewsLocalRepository,
  HackerNewsRemoteRepository,
  HackerNewsRepository,
} from "../../data/HackNewsRepository";

const local = new HackerNewsLocalRepository();
const remote = new HackerNewsRemoteRepository();
const repo = new HackerNewsRepository(local, remote);

class DeletePostUseCase implements UseCase<void, string> {
  async execute(id: string): Promise<void> {
    try {
      repo.deletePost(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new DeletePostUseCase();
