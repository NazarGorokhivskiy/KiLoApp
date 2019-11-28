import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Card, Title } from "react-native-paper";
import Collapsible from "react-native-collapsible";

import emptyImage from "../images/empty.jpg";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    };
  }

  render() {
    const { item, openPanelDetails } = this.props;
    const { isCollapsed } = this.state;

    return (
      <Card style={styles.cardContainer} onPress={() => openPanelDetails(item)}>
        <Card.Content style={styles.content}>
          <Card.Cover source={item.image ? { uri: item.image } : emptyImage} />
          <View style={styles.textContent}>
            <Title style={styles.header}>{item.name}</Title>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ isCollapsed: !isCollapsed })}>
              <Text style={[styles.text, styles.showInfo]}>Show info</Text>
            </TouchableWithoutFeedback>
            <Collapsible align="bottom" collapsed={isCollapsed}>
              <View style={styles.collapsedContent}>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <Text style={styles.text}>Department: {item.department}</Text>
                <Text style={styles.text}>Producer: {item.producer}</Text>
                <Text style={styles.text}>
                  Market address: {item.market_adress}
                </Text>
              </View>
            </Collapsible>
          </View>
        </Card.Content>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
    paddingHorizontal: 0,
    paddingBottom: 10,
    backgroundColor: "#181818",
  },

  header: {
    fontSize: 24,
    color: "white",
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },

  showInfo: {
    marginTop: 10,
    fontStyle: "italic",
  },

  textContent: {
    marginTop: 10,
  },

  collapsedContent: {
    paddingTop: 10,
  },
});
