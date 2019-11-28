import { createAppContainer, createSwitchNavigator } from "react-navigation";

import BottomTabNavigator from "./BottomTabNavigator";
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
import ROUTES from "../consts/routes";

const AppNavigator = createSwitchNavigator(
  {
    [ROUTES.SIGN_IN]: SignInScreen,
    [ROUTES.SIGN_UP]: SignUpScreen,
    [ROUTES.MAIN]: BottomTabNavigator,
  },
  {
    initialRouteName: ROUTES.SIGN_IN,
  },
);

export default createAppContainer(AppNavigator);
