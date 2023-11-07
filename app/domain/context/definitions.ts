import { Reducer } from "react";

export interface HackerNewsState {
  isLoading: boolean;
  isRefreshing: boolean;
  isSearching: boolean;
  isTop: boolean;
  page: number;
  posts: HackerNew[];
  query: string;
}

export const initialHackerNewsState: HackerNewsState = {
  isLoading: false,
  isRefreshing: false,
  isSearching: false,
  isTop: true,
  page: 0,
  posts: [],
  query: "",
};

type ObjectReducer<T> = Reducer<T, Partial<T>>;

export type HackerNewsStateReducer = ObjectReducer<HackerNewsState>;

export const reducer: HackerNewsStateReducer = (prev, update) => ({
  ...prev,
  ...update,
});
