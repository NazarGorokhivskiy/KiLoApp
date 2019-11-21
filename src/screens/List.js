import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import PanelsList from "../components/PanelsList";
import firebase from "../config/fbConfig";
import ROUTES from "../consts/routes";

export default class List extends React.Component {
  handleSignOutPress = async () => {
    try {
      await firebase.auth().signOut();

      this.props.navigation.navigate(ROUTES.SIGN_IN);
    } catch (e) {
      alert("Couldn't sign out");
    }
  };

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <Appbar style={styles.appbar}>
          <Appbar.BackAction onPress={this.handleSignOutPress} />
          <Appbar.Content title="Panels list" />
        </Appbar>
        <PanelsList />
      </View>
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

  appbar: {
    width: "100%",
    backgroundColor: "black",
  },
});
