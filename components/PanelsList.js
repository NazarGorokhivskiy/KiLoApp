import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from "react-native-paper";

import ListItem from "../components/ListItem";
import { SERVER_API_URL } from "../consts/db";

export default class PanelsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
      snackbarMessage: "",
    };
  }

  renderListItem = ({ item }) => <ListItem item={item} />;

  handleKeyExtractor = item => "" + item.id;

  getPanelsInfo = () => {
    this.setState({ isLoading: true });

    fetch(SERVER_API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.panels });
      })
      .catch(e => this.setState({ snackbarMessage: e.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  showList = state => {
    if (state.isConnected) {
      this.getPanelsInfo();
    } else {
      this.setState({ snackbarMessage: "No internet connection" });
    }
  };

  componentDidMount() {
    this.unsubscribeFromNetInfo = NetInfo.addEventListener(this.showList);

    NetInfo.fetch().then(this.showList);
  }

  componentWillUnmount() {
    this.unsubscribeFromNetInfo();
  }

  render() {
    const { isLoading, data, snackbarMessage } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          refreshing={isLoading}
          onRefresh={this.getPanelsInfo}
          renderItem={this.renderListItem}
          keyExtractor={this.handleKeyExtractor}
        />
        <Snackbar
          visible={!!snackbarMessage}
          onDismiss={() => this.setState({ snackbarMessage: "" })}
          duration={5000}
          action={{
            label: "Okay",
            onPress: () => this.setState({ snackbarMessage: "" }),
          }}>
          {snackbarMessage}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    width: "100%",
    paddingHorizontal: "3%",
  },
});
