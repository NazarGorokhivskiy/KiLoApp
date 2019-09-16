import React, {Fragment} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text>Hello world</Text>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
