import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import { capitalize } from "../helpers/parsers";

const AddingInput = props => {
  const {
    name,
    value,
    onValueChange,
    errorMessage,
    style,
    numeric,
    ...restProps
  } = props;
  const placeholder = capitalize(name);

  handleChange = value => {
    onValueChange(name, value);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleChange}
          placeholderTextColor="#fffa"
          underlineColorAndroid="transparent"
          keyboardType={numeric && "numeric"}
          value={value}
          type
          {...restProps}
        />
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
  },

  innerContainer: {
    width: '100%',
    flexDirection: "row",
    backgroundColor: "#fff3",
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  input: {
    height: 48,
    flex: 1,
    fontSize: 18,
    color: "#fff",
  },

  error: {
    color: "#e6e6e6",
    marginLeft: 10,
    marginTop: 5,
  },
});

export default AddingInput;
