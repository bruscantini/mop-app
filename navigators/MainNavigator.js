import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeNavigator from '../navigators/HomeNavigator';
import { setAuthorization } from '../redux/reducer';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Home: { screen: HomeNavigator }
});

const mapStateToProps = state => {
  return { isSignedIn: state.isSignedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthorization: (isSignedIn) => {
      dispatch(setAuthorization(isSignedIn));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
