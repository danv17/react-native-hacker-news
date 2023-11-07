import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigation from "./app/presentation/navigation";
import { HackerNewsState } from "./app/domain/context";

export default function App() {
  return (
    <NavigationContainer>
      <HackerNewsState>
        <Navigation />
      </HackerNewsState>
    </NavigationContainer>
  );
}
