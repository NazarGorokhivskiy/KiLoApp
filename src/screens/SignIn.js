import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator } from "react-native";

import firebase from "../config/fbConfig";
import InputWithValidation from "../components/InputWithValidation";
import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import { validatePassword, validateEmail } from "../helpers/validators";
import ROUTES from "../consts/routes";
import LoginButton from "../components/LoginButton";
import { ScrollView } from "react-native-gesture-handler";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "nazargorokhivskiy@gmail.com",
      password: "11111111",
      isLoading: false,
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
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Email is not correct";
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

    if (Object.keys(errors).length !== 0) return;

    try {
      this.setState({ isLoading: true });

      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
      
      this.props.navigation.navigate(ROUTES.MAIN);
    } catch ({ message }) {
      this.setState({ isLoading: false });

      alert(`Error ${message}`);
    }
  };

  handleLinkPress = () => {
    this.props.navigation.navigate(ROUTES.SIGN_UP);
  };

  render() {
    const { email, password, errors, isLoading } = this.state;

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.center}>
              <Text style={styles.logoText}>Welcome to KiLo</Text>
              <InputWithValidation
                style={styles.input}
                name="email"
                value={email}
                onValueChange={this.handleValueChange}
                icon="envelope"
                errorMessage={errors.email}
              />
              <InputWithValidation
                style={styles.input}
                name="password"
                value={password}
                onValueChange={this.handleValueChange}
                icon="lock"
                isPassword={true}
                errorMessage={errors.password}
              />
            </View>
            <View style={styles.bottom}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <LoginButton
                  style={styles.submitButton}
                  text="Sign in"
                  onPress={this.handleSignInPress}
                />
              )}
              <Text style={styles.formBottom}>
                First time?{" "}
                <Text style={styles.refToSignUp} onPress={this.handleLinkPress}>
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  top: {
    flex: 1,
    justifyContent: "flex-end",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottom: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: "5%",
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

  input: {
    marginBottom: 15,
  },

  formBottom: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },

  refToSignUp: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SignIn;
