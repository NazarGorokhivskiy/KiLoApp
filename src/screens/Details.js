import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Appbar, Caption } from "react-native-paper";
import { NavigationActions } from "react-navigation";

export default Details = ({ navigation }) => {
  const panel = navigation.getParam("panel", {});

  const handleBackPress = () => {
    navigation.dispatch(NavigationActions.back());
  };

  return (
    <View style={styles.backgroundContainer}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title="Details" />
      </Appbar>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          {panel.image ? (
            <Image
              resizeMode={"contain"}
              source={{ uri: panel.image }}
              style={styles.image}
            />
          ) : (
            <Caption style={styles.noImage}>No image data</Caption>
          )}
          <Caption style={styles.caption}>Title</Caption>
          <Text style={styles.text}>{panel.name}</Text>
          <Caption style={styles.caption}>Quantity</Caption>
          <Text style={styles.text}>{panel.quantity}</Text>
          <Caption style={styles.caption}>Department</Caption>
          <Text style={styles.text}>{panel.department}</Text>
          <Caption style={styles.caption}>Producer</Caption>
          <Text style={styles.text}>{panel.producer}</Text>
          <Caption style={styles.caption}>Marketaddress</Caption>
          <Text style={styles.text}>{panel.market_adress}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },

  appbar: {
    width: "100%",
    backgroundColor: "black",
  },

  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
  },

  image: {
    alignSelf: "stretch",
    width: "100%",
    height: 200,
    marginBottom: 20,
  },

  noImage: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },

  caption: {
    color: "white",
    fontSize: 16,
  },

  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
