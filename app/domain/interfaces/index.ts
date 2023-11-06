interface UseCase<T, P = undefined> {
  execute({ ...params }?: P): Promise<T>;
}
