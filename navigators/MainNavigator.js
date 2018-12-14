import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeTabNavigator from '../navigators/HomeTabNavigator';
import colors from '../utils/colors';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Home: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.darkPurple
    },
    headerTitleStyle: {
      color: colors.yellow
    },
    headerBackTitleStyle: {
      color: colors.white,
    },
    headerTintColor: colors.white
  }
});

export default MainNavigator;
