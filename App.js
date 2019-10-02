import React, {Fragment} from "react";
import {SafeAreaView, StyleSheet, StatusBar} from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import firebase from "./config/fbConfig";
import {AuthContext} from "./contexts";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User signs up/in
        
        this.setState({
          username: user.displayName,
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        <AuthContext.Provider value={{username: this.state.username}}>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default App;
