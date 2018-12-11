import { createBottomTabNavigator } from 'react-navigation';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookingNavigator from './BookingNavigator';

const HomeNavigator = createBottomTabNavigator({
  Book: BookingNavigator,
  Orders: OrdersScreen,
  Settings: SettingsScreen,
});

export default HomeNavigator;
