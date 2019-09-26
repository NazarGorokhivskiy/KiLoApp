import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
} from 'react-native';

import InputWithValidation from '../components/InputWithValidation';
import bgImage from '../images/background.jpg';
import logo from '../images/logo.png';
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from '../helpers/validators';

class SignUp extends React.Component {
  state = {
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    errors: {},
  };

  handleValueChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleSignUpPress = () => {
    const {email, username, phoneNumber, password} = this.state;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email is incorrect';
    }

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is incorrect';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    this.setState({errors: newErrors});
  };

  handleLinkPress = () => {
    this.props.navigation.navigate('signIn');
  };

  render() {
    const {email, username, phoneNumber, password, errors} = this.state;

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>KiLo app</Text>
        </View>

        <InputWithValidation
          name="email"
          value={email}
          onValueChange={this.handleValueChange}
          icon={'envelope'}
          errorMessage={errors.email}
        />
        <InputWithValidation
          name="username"
          value={username}
          onValueChange={this.handleValueChange}
          icon={'user'}
          errorMessage={errors.username}
        />
        <InputWithValidation
          name="phoneNumber"
          value={phoneNumber}
          onValueChange={this.handleValueChange}
          icon={'phone'}
          errorMessage={errors.phoneNumber}
        />
        <InputWithValidation
          name="password"
          value={password}
          onValueChange={this.handleValueChange}
          icon={'lock'}
          isPassword={true}
          errorMessage={errors.password}
        />

        <View style={styles.submitButton}>
          <Button
            color="#222"
            title="Sign up"
            onPress={this.handleSignUpPress}
          />
        </View>

        <Text style={styles.formBottom}>
          Don't have an account yet?{' '}
          <Text style={styles.refToSignIn} onPress={this.handleLinkPress}>
            Sign in
          </Text>
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButton: {
    width: 200,
    marginHorizontal: 'auto',
    marginTop: 2,
  },
  formBottom: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  refToSignIn: {
    color: '#ccc',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
