import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';

import bgImage from './images/background.jpg';
import logo from './images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.logoText}>KiLo app</Text>
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={'person'}
              size={28}
              color={'rgba(255, 255, 255, 0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={'lock'}
              size={28}
              color={'rgba(255, 255, 255, 0.7)'}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              textContentType="password"
              placeholder={'Password'}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid="transparent"
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    width: WIDTH - 55,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0, 0.55)',
  },
  input: {
    height: 48,
    paddingRight: 50,
    marginLeft: 8,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default App;
