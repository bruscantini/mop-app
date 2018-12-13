import { createBottomTabNavigator } from 'react-navigation';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookingNavigator from './BookingNavigator';

const HomeTabNavigator = createBottomTabNavigator({
  Orders: OrdersScreen,
  Book: BookingNavigator,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Book',
  tabBarOptions: {
    tabStyle: {
      justifyContent: 'center'
    },
    showIcon: false
  }
});

export default HomeTabNavigator;
