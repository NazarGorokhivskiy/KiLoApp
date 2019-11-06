import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from "react-native-paper";

import ListItem from "../components/ListItem";

export default class PanelsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
      snackbarMessage: "",
    };
  }

  handleRenderItem = ({ item }) => <ListItem item={item} />;

  handleKeyExtractor = item => "" + item.id;

  getPanelsInfo = () => {
    const API_URL = "https://ngorokhivskiy-backend.appspot.com/panel";
    this.setState({ isLoading: true });

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.panels });
      })
      .catch(e => {
        this.setState({
          snackbarMessage: e.message,
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount() {
    this.unsubscribeFromNetInfo = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.getPanelsInfo();
      } else {
        this.setState({ snackbarMessage: "No internet connection" });
      }
    });

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.getPanelsInfo();
      } else {
        this.setState({ snackbarMessage: "No internet connection" });
      }
    });
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
          renderItem={this.handleRenderItem}
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
