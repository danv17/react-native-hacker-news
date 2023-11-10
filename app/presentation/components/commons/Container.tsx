import React from "react";
import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default ({ children }: PropsWithChildren<{}>) => {
  const { container } = styles;
  return <SafeAreaView style={container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
  },
});
