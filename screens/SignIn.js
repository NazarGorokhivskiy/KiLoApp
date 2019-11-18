import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
} from "react-native";

import firebase from "../config/fbConfig";
import InputWithValidation from "../components/InputWithValidation";
import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import { validatePassword } from "../helpers/validators";
import ROUTES from "../consts/routes";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  handleValueChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  validateInputs = () => {
    const { email, password } = this.state;
    const errors = {};

    if (!email) {
      errors.email = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  handleSignInPress = async () => {
    const { email, password } = this.state;
    const errors = this.validateInputs();
    this.setState({ errors });

    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);

      this.props.navigation.navigate(ROUTES.MAIN);
    } catch ({ message }) {
      alert(`Error ${message}`);
    }
  };

  handleLinkPress = () => {
    this.props.navigation.navigate(ROUTES.SIGN_UP);
  };

  render() {
    const { email, password, errors } = this.state;

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
          icon="envelope"
          errorMessage={errors.email}
        />
        <InputWithValidation
          name="password"
          value={password}
          onValueChange={this.handleValueChange}
          icon="lock"
          isPassword={true}
          errorMessage={errors.password}
        />
        <View style={styles.submitButton}>
          <Button
            color="#222"
            title="Sign In"
            onPress={this.handleSignInPress}
          />
        </View>
        <Text style={styles.formBottom}>
          First time?{" "}
          <Text style={styles.refToSignUp} onPress={this.handleLinkPress}>
            Sign up
          </Text>
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
  },

  logoText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },

  submitButton: {
    width: 200,
    marginHorizontal: "auto",
    marginTop: 2,
  },

  formBottom: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },

  refToSignUp: {
    color: "#ccc",
    textDecorationLine: "underline",
  },
});

export default SignIn;
