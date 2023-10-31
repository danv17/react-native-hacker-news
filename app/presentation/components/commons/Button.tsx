import { Text, Pressable, ButtonProps, StyleSheet } from "react-native";
import React from "react";

export default function Button({
  title,
  onPress,
  type = "primary",
}: ButtonProps & { type: "primary" | "secondary" }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, styles[type]]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#666",
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderLeftWidth: 1,
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: "green",
  },
  secondary: {
    backgroundColor: "#cc0100",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
