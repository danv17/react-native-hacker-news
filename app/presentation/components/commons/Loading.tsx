import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View style={{ marginVertical: 50 }}>
      <View style={StyleSheet.absoluteFillObject}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}
