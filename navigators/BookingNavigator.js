import { createStackNavigator } from 'react-navigation';
import ChooseAddressScreen from '../screens/ChooseAddressScreen';
import NewAddressScreen from '../screens/NewAddressScreen';
import BookingScreen from '../screens/BookingScreen';
import colors from '../utils/colors';

const BookingNavigator = createStackNavigator({
  ChooseAddress: ChooseAddressScreen,
  NewAddress: NewAddressScreen,
  Booking: {
    screen: BookingScreen
  }
}, {
  initialRouteName: 'ChooseAddress',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.darkPurple
    },
    headerTitleStyle: {
      color: colors.yellow
    }
  }
});

export default BookingNavigator;
