import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default function TransparentButton({ onPress, text, style }) {
  return (
    <View style={style}>
      <TouchableHighlight
        style={styles.container}
        underlayColor="#eee2"
        onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 170,
    padding: 12,
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    borderWidth: 3,
    borderColor: "white",
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
