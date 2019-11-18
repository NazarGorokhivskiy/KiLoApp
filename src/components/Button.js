import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";

export default function Button({ onPress, text }) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="#101010"
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    padding: 12,
    backgroundColor: "#111",
    marginHorizontal: "auto",
    borderRadius: 30,
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
