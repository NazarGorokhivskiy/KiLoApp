import { createStackNavigator } from "react-navigation-stack";

import ROUTES from "../consts/routes";
import ListScreen from "../screens/List";
import DetailsScreen from "../screens/Details";
import AddingScreen from "../screens/Adding";

export default ListStackNavigator = createStackNavigator(
  {
    [ROUTES.LIST]: { screen: ListScreen },
    [ROUTES.DETAILS]: { screen: DetailsScreen },
    [ROUTES.ADDING]: { screen: AddingScreen },
  },
  {
    headerMode: "none",
  },
);
