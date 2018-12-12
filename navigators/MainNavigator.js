import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeTabNavigator from '../navigators/HomeTabNavigator';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Home: {
    screen: HomeTabNavigator,
    navigationOptions: { header: null }
  }
}, {
  initialRouteName: 'Login'
});

export default MainNavigator;
