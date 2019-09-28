import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Main extends React.Component {
  state = {
    username: '',
  };

  componentDidMount() {
    const username = this.props.navigation.getParam('username', 'User');
    this.setState({username});
  }

  handleSignOutPress = () => {
    this.props.navigation.navigate('signIn');
  };

  render() {
    const {username} = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <Text style={styles.heading}>{`Welcome, ${username}`}</Text>
        <View style={styles.submitButton}>
          <Button
            color="#222"
            title="Sign out"
            onPress={this.handleSignOutPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  heading: {
    color: 'white',
    fontSize: 20,
  },
  submitButton: {
    width: 200,
    marginHorizontal: 'auto',
    marginTop: 16,
  },
});
