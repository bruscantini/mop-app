import { createStackNavigator } from 'react-navigation';
import ChooseAddressScreen from '../screens/ChooseAddressScreen';
import NewAddressScreen from '../screens/NewAddressScreen';
import BookingScreen from '../screens/BookingScreen';

const BookingNavigator = createStackNavigator({
  ChooseAddress: ChooseAddressScreen,
  NewAddress: NewAddressScreen,
  Booking: BookingScreen
});

export default BookingNavigator;