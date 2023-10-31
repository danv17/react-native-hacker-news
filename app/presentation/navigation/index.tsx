import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostDetailView from "../views/PostDetailView";
import PostListView from "../views/PostListView";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="PostList">
      <Stack.Screen
        name="PostList"
        component={PostListView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailView}
        options={{ headerTitle: "Back" }}
      />
    </Stack.Navigator>
  );
}
