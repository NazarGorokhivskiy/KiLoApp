import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { capitalize } from "../helpers/parsers";
import { MAIN_DARKER } from "../consts/colors";

const InputWithValidation = props => {
  const {
    name,
    value,
    onValueChange,
    icon,
    isPassword,
    errorMessage,
    style,
    ...restProps
  } = props;
  const placeholder = capitalize(name);

  const handleChange = value => {
    onValueChange(name, value);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.innerContainer}>
        {icon && <Icon name={icon} size={28} color={MAIN_DARKER} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleChange}
          placeholderTextColor={MAIN_DARKER}
          secureTextEntry={isPassword}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          value={value}
          {...restProps}
        />
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    marginBottom: 10,
    marginHorizontal: 20,
  },

  innerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0009",
    paddingHorizontal: 20,
    borderRadius: 25,
  },

  input: {
    height: 48,
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#fffa",
  },

  error: {
    color: "#e6e6e6",
    marginLeft: 20,
  },
});

export default InputWithValidation;
