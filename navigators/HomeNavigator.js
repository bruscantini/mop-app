import { createBottomTabNavigator } from 'react-navigation';
import BookingScreen from '../screens/BookingScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeNavigator = createBottomTabNavigator({
  Book: BookingScreen,
  Orders: OrdersScreen,
  Settings: SettingsScreen,
});

export default HomeNavigator;
