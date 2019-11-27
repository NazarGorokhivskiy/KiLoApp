import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { NavigationEvents } from "react-navigation";

import ListItem from "../components/ListItem";
import API from "../helpers/api";

export default class PanelsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isInternetAvailable: false,
      data: [],
    };
  }

  renderListItem = ({ item }) => (
    <ListItem
      item={item}
      openPanelDetails={this.props.handleOpenPanelDetails}
    />
  );

  handleKeyExtractor = item => "" + item.id;

  getPanelsInfo = () => {
    this.setState({ isLoading: true });

    API.get("panel")
      .then(data => this.setState({ data: data.panels }))
      .catch(e => this.props.onErrorAppear(e.message))
      .finally(() => this.setState({ isLoading: false }));
  };

  showList = () => {
    if (this.state.isInternetAvailable) {
      this.getPanelsInfo();
    } else {
      this.props.onErrorAppear("No internet connection");
    }
  };

  componentDidMount() {
    this.unsubscribeFromNetInfo = NetInfo.addEventListener(state => {
      this.setState({ isInternetAvailable: state.isConnected });
    });

    NetInfo.fetch().then(state => {
      this.setState({ isInternetAvailable: state.isConnected }, this.showList);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromNetInfo();
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={({ action: { params } }) => {
            params && params.shouldUpdate && this.showList();
          }}
        />
        <FlatList
          style={styles.list}
          data={data}
          refreshing={isLoading}
          onRefresh={this.showList}
          renderItem={this.renderListItem}
          keyExtractor={this.handleKeyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  list: {
    width: "100%",
    paddingHorizontal: "3%",
  },
});
