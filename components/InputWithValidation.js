import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {capitalize} from '../helpers/parsers';

export default inputWithValidation = props => {
  const {name, value, onValueChange, icon, isPassword, errorMessage, ...rest} = props;
  const placeholder = capitalize(name);

  handleChange = value => {
    onValueChange(name, value);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.innerContainer}>
        {icon && (
          <Icon name={icon} size={28} color={'rgba(255, 255, 255, 0.7)'} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleChange}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          secureTextEntry={isPassword}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          value={value}
          {...rest}
        />
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  innerContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0009',
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  input: {
    height: 48,
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#fffa',
  },
  error: {
    color: '#e6e6e6',
    marginLeft: 20,
  },
});
