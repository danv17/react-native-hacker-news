import React, {
  Dispatch,
  PropsWithChildren,
  createContext,
  useReducer,
} from "react";
import {
  HackerNewsStateReducer,
  initialHackerNewsState,
  reducer,
} from "./definitions";

export const HackerNewsStateContext = createContext(initialHackerNewsState);
export const HackerNewsReducerContext = createContext<
  Dispatch<Partial<HackerNewsStateReducer>> | undefined
>(undefined);

export function HackerNewsState({ children }: PropsWithChildren<{}>) {
  const [state, update] = useReducer(reducer, initialHackerNewsState);

  return (
    <HackerNewsStateContext.Provider value={state}>
      <HackerNewsReducerContext.Provider value={update}>
        {children}
      </HackerNewsReducerContext.Provider>
    </HackerNewsStateContext.Provider>
  );
}
