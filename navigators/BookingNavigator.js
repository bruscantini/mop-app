import { createStackNavigator } from 'react-navigation';
import ChooseAddressScreen from '../screens/ChooseAddressScreen';

const BookingNavigator = createStackNavigator({
  ChooseAddress: ChooseAddressScreen
});

export default BookingNavigator;
