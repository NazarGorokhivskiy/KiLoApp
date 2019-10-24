import React, {Fragment} from "react";
import {SafeAreaView, StyleSheet, StatusBar} from "react-native";

import AppNavigator from "./navigation/AppNavigator";

const App = props => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default App;
