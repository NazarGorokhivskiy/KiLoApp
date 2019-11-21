import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import ROUTES from '../consts/routes';
import ListStackNavigator from './ListStackNavigator';
import ProfileScreen from "../screens/Profile";
import EmptyScreen from "../screens/Empty";

const TabBarIcon = ({ name, focused }) => (
  <Icon name={name} size={22} color={focused ? "white" : "silver"} />
);

export default BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    list: {
      screen: ListStackNavigator,
      navigationOptions: {
        tabBarLabel: "List",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="list" focused={focused} />
        ),
      },
    },
    emptyTab: {
      screen: EmptyScreen,
      navigationOptions: {
        title: "Empty",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="pencil" focused={focused} />
        ),
      },
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "My profile",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="user" focused={focused} />
        ),
      },
    },
  },
  {
    sceneAnimationEnabled: false,
    backBehavior: "history",
    initialRouteName: ROUTES.PROFILE,
    activeColor: "#f0edf6",
    inactiveColor: "#ccc",
    barStyle: { backgroundColor: "#111" },
    shifting: true,
  },
);
