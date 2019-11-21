import { createStackNavigator } from 'react-navigation-stack'

import ListScreen from "../screens/List";
import DetailsScreen from "../screens/Details";

export default ListStackNavigator = createStackNavigator({
  list: { screen: ListScreen },
  details: { screen: DetailsScreen },
}, {
  headerMode: "none"
});
