import React from "react";
import { PostDetailScreenProps } from "../types";
import { WebView } from "react-native-webview";

export default function PostDetailView({ route }: PostDetailScreenProps) {
  const { story_url, comment_text } = route.params;

  if (!story_url)
    return <WebView source={{ html: comment_text }} style={{ flex: 1 }} />;

  return <WebView source={{ uri: story_url }} style={{ flex: 1 }} />;
}
