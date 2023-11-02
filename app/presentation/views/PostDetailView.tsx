import React from "react";
import { PostDetailScreenProps } from "../types";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native";

export default function PostDetailView({ route }: PostDetailScreenProps) {
  const { source } = route.params;

  return (
    <WebView
      source={source}
      style={{ flex: 1 }}
      startInLoadingState
      renderLoading={() => <ActivityIndicator size="large" />}
    />
  );
}
