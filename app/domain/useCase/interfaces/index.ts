interface UseCase<T> {
  execute(): Promise<T>;
}
