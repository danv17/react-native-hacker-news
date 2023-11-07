import { Reducer } from "react";

export interface HackerNewsState {
  isLoading: boolean;
  isRefreshing: boolean;
  isTop: boolean;
  page: number;
  posts: HackerNew[];
}

export const initialHackerNewsState: HackerNewsState = {
  isLoading: false,
  isRefreshing: false,
  isTop: true,
  page: 0,
  posts: [],
};

type ObjectReducer<T> = Reducer<T, Partial<T>>;

export type HackerNewsStateReducer = ObjectReducer<HackerNewsState>;

export const reducer: HackerNewsStateReducer = (prev, update) => ({
  ...prev,
  ...update,
});
