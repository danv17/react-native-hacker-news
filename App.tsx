import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigation from "./app/presentation/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
