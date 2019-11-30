import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground, ActivityIndicator } from "react-native";

import LoginButton from "../components/LoginButton";
import InputWithValidation from "../components/InputWithValidation";
import firebase from "../config/fbConfig";
import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import { validateEmail, validatePhoneNumber, validatePassword } from "../helpers/validators";
import ROUTES from "../consts/routes";
import { ScrollView } from "react-native-gesture-handler";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
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
    const { email, username, phoneNumber, password } = this.state;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Email is incorrect";
    }

    if (!username) {
      errors.username = "Username is required";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = "Phone number is incorrect";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  handleSignUpPress = async () => {
    const { email, password, username } = this.state;
    const errors = this.validateInputs();
    this.setState({ errors });

    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      this.setState({ isLoading: true });
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

      await user.updateProfile({ displayName: username });

      this.props.navigation.navigate(ROUTES.MAIN);
    } catch ({ message }) {
      this.setState({ isLoading: false });

      alert(`Error: ${message}`);
    }
  };

  handleLinkPress = () => {
    this.props.navigation.navigate(ROUTES.SIGN_IN);
  };

  render() {
    const { email, username, phoneNumber, password, isLoading, errors } = this.state;

    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.center}>
              <Text style={styles.logoText}>Join KiLo right now!</Text>
              <InputWithValidation
                name="email"
                value={email}
                onValueChange={this.handleValueChange}
                icon="envelope"
                errorMessage={errors.email}
              />
              <InputWithValidation
                name="username"
                value={username}
                onValueChange={this.handleValueChange}
                icon="user"
                errorMessage={errors.username}
                autoCapitalize="sentences"
              />
              <InputWithValidation
                name="phoneNumber"
                value={phoneNumber}
                onValueChange={this.handleValueChange}
                icon="phone"
                errorMessage={errors.phoneNumber}
                keyboardType="numeric"
              />
              <InputWithValidation
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
                <LoginButton text="Sign up" onPress={this.handleSignUpPress} />
              )}
              <Text style={styles.formBottom}>
                Already have an account?{" "}
                <Text style={styles.refToSignIn} onPress={this.handleLinkPress}>
                  Sign in
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

  formBottom: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginTop: 12,
  },

  refToSignIn: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 10,
  },
});

export default SignUp;
