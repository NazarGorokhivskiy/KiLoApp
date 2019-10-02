import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";

import firebase from "../config/fbConfig";
import Routes from "../consts/routes";
import {AuthContext} from "../contexts";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    const username = "User";
    this.setState({username});
  }

  handleSignOutPress = async () => {
    try {
      await firebase.auth().signOut();

      this.props.navigation.navigate(Routes.SIGN_IN);
    } catch (e) {
      console.error(e);
      alert("Couldn't sign out");
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {context => (
          <View style={styles.backgroundContainer}>
            <Text
              style={
                styles.heading
              }>{`Welcome, ${context.username}`}</Text>
            <View style={styles.submitButton}>
              <Button
                color="#222"
                title="Sign out"
                onPress={this.handleSignOutPress}
              />
            </View>
          </View>
        )}
      </AuthContext.Consumer>
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
    backgroundColor: "#333",
  },

  heading: {
    color: "white",
    fontSize: 20,
  },

  submitButton: {
    width: 200,
    marginHorizontal: "auto",
    marginTop: 16,
  },
});
