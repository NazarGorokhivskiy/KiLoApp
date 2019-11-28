import { createStackNavigator } from "react-navigation-stack";

import ROUTES from "../consts/routes";
import ListScreen from "../screens/List";
import DetailsScreen from "../screens/Details";

export default ListStackNavigator = createStackNavigator(
  {
    [ROUTES.LIST]: { screen: ListScreen },
    [ROUTES.DETAILS]: { screen: DetailsScreen },
  },
  {
    headerMode: "none",
  },
);
