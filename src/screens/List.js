import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, FAB } from "react-native-paper";

import PanelsList from "../components/PanelsList";
import ErrorSnackbar from "../components/ErrorSnackbar";
import firebase from "../config/fbConfig";
import ROUTES from "../consts/routes";

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarMessage: "",
    };
  }

  handleSignOutPress = async () => {
    try {
      await firebase.auth().signOut();

      this.props.navigation.navigate(ROUTES.SIGN_IN);
    } catch (e) {
      this.setState({ snackbarMessage: "Couldn't sign out" });
    }
  };

  handleOpenPanelDetails = panel => this.props.navigation.navigate(ROUTES.DETAILS, { panel });

  handleAdd = () => this.props.navigation.navigate(ROUTES.ADDING);

  handleErrorAppear = message => this.setState({ snackbarMessage: message });

  render() {
    const { snackbarMessage } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Appbar style={styles.appbar}>
          <Appbar.BackAction onPress={this.handleSignOutPress} />
          <Appbar.Content title="Panels list" />
        </Appbar>
        <PanelsList
          onErrorAppear={this.handleErrorAppear}
          handleOpenPanelDetails={this.handleOpenPanelDetails}
        />
        <FAB style={styles.fab} icon="plus" onPress={this.handleAdd} />
        <ErrorSnackbar message={snackbarMessage} onDismiss={() => this.handleErrorAppear("")} />
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

  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
    backgroundColor: "yellow",
  },
});
