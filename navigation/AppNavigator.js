import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';

const AppNavigator = createSwitchNavigator(
  {
    signIn: SignInScreen,
    signUp: SignUpScreen,
  },
  {
    initialRouteName: 'signUp',
  },
);

export default createAppContainer(AppNavigator);
