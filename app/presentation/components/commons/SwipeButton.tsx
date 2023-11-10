import React from "react";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SwipeButton({
  icon,
  onPress,
  side = "right",
  type = "delete",
  inverted = false,
  disabled = false,
}: Omit<ButtonProps, "title"> & {
  icon: string;
  inverted?: boolean;
  side?: "left" | "right";
  type?: "delete" | "like";
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        inverted
          ? {
              borderColor: styles[type].backgroundColor,
              backgroundColor: "#fff",
              borderWidth: 2,
            }
          : styles[type],
        styles[side],
        disabled && styles.disabled,
      ]}
    >
      <FontAwesome5
        name={icon}
        size={24}
        style={
          !inverted ? styles.icon : { color: styles[type].backgroundColor }
        }
        solid={inverted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 5,
  },
  right: {
    marginLeft: 10,
  },
  left: {
    marginRight: 10,
  },
  delete: {
    backgroundColor: "#CC0100CC",
    borderColor: "#CC0100",
  },
  like: {
    backgroundColor: "#397684CC",
    borderColor: "#397684",
  },
  icon: {
    color: "#FFF",
  },
  disabled: {
    borderWidth: 2,
    borderColor: "#aeaeae",
    backgroundColor: "#aeaeae90",
  },
});
