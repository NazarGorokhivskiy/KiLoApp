import React from "react";
import {SafeAreaView, StyleSheet, StatusBar} from "react-native";
import {Provider as PaperProvider} from "react-native-paper";

import AppNavigator from "./navigation/AppNavigator";

const App = props => (
  <PaperProvider>
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default App;
