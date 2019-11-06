import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
import MainScreen from "../screens/Main";
import ROUTES from "../consts/routes";

const AppNavigator = createSwitchNavigator(
  {
    signIn: SignInScreen,
    signUp: SignUpScreen,
    main: MainScreen,
  },
  {
    initialRouteName: ROUTES.MAIN,
  },
);

export default createAppContainer(AppNavigator);
