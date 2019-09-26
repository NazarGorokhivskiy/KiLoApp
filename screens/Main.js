import React from 'react';
import {View, Text} from 'react-native';

export default class Main extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const {username} = this.state;

    return (
      <View>
        <Text>{`Welcome, ${username}`}</Text>
      </View>
    );
  }
}
